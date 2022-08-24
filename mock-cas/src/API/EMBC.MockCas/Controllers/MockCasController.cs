﻿using EMBC.MockCas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMBC.MockCas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MockCasController : ControllerBase
    {
        private readonly ILogger<MockCasController> _logger;
        private readonly MockCasDb db;

        public MockCasController(ILogger<MockCasController> logger, MockCasDb db)
        {
            _logger = logger;
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Invoice>>> Get()
        {
            return await db.Invoices.ToListAsync();
        }

        [HttpPost("cfs/apinvoice")]
        public async Task<ActionResult<InvoiceResponse>> CreateInvoice(Invoice invoice)
        {
            await db.Invoices.AddAsync(invoice);
            var item = CreateItemFromInvoice(invoice);
            item.Invoicecreationdate = DateTime.UtcNow;
            await db.InvoiceItems.AddAsync(item);
            var response = new InvoiceResponse
            {
                InvoiceNumber = invoice.InvoiceNumber,
                CASReturnedMessages = "SUCCEEDED"
            };
            await db.SaveChangesAsync();
            return response;

        }

        [HttpGet("cfs/supplierbyname/{supplierName}/{postalCode}")]
        public async Task<ActionResult<GetSupplierResponse>> GetSupplierByName(string supplierName, string postalCode)
        {
            var supplier = await db.Suppliers.FirstOrDefaultAsync(s => s.Suppliername == supplierName);

            if (supplier != null)
            {
                supplier.SupplierAddress = supplier.SupplierAddress.Where(a => a.PostalCode != null && a.PostalCode == postalCode).ToList();
                return supplier;
            }
            return NotFound();
        }

        [HttpPost("cfs/supplier")]
        public async Task<ActionResult<CreateSupplierResponse>> CreateSupplier(CreateSupplierRequest supplier)
        {
            supplier.SupplierAddress.First().Suppliersitecode = "001";
            GetSupplierResponse toAdd = new GetSupplierResponse
            {
                Suppliernumber = new Random().Next(1, 1000000).ToString(),
                Suppliername = supplier.SupplierName,
                Subcategory = supplier.SubCategory,
                Businessnumber = supplier.BusinessNumber,
                SupplierAddress = supplier.SupplierAddress,
                Providerid = "CAS_SU_AT_ESS"
            };

            await db.Suppliers.AddAsync(toAdd);

            var response = new CreateSupplierResponse
            {
                SupplierNumber = toAdd.Suppliernumber,
                SupplierSiteCode = "site code",
                CASReturnedMessages = "SUCCEEDED"
            };
            //await db.SaveChangesAsync();

            foreach(var address in supplier.SupplierAddress)
            {
                address.Supplier = toAdd;
                db.SupplierAddress.Add(address);
            }
            await db.SaveChangesAsync();

            return response;
        }

        [HttpGet("cfs/apinvoice/paymentsearch/{payGroup}")]
        public async Task<ActionResult<GetInvoiceResponse>> GetInvoice(string payGroup, [FromQuery] InvoiceParameters getRequest)
        {
            var pageLength = 1;
            var nextPage = 1;

            IQueryable<InvoiceItem> query = db.InvoiceItems;
            if (!string.IsNullOrWhiteSpace(getRequest.invoicenumber)) query = query.Where(i => i.Invoicenumber == getRequest.invoicenumber);
            if (!string.IsNullOrWhiteSpace(getRequest.suppliernumber)) query = query.Where(i => i.Suppliernumber == getRequest.suppliernumber);
            if (!string.IsNullOrWhiteSpace(getRequest.sitecode)) query = query.Where(i => i.Sitecode == getRequest.sitecode);
            if (!string.IsNullOrWhiteSpace(getRequest.paymentstatus)) query = query.Where(i => i.Paymentstatus == getRequest.paymentstatus);
            if (!string.IsNullOrWhiteSpace(getRequest.paymentnumber)) query = query.Where(i => i.Paymentnumber == int.Parse(getRequest.paymentnumber));
            if (!string.IsNullOrWhiteSpace(getRequest.invoicecreationdatefrom)) query = query.Where(i => i.Invoicecreationdate >= DateTime.Parse(getRequest.invoicecreationdatefrom));
            if (!string.IsNullOrWhiteSpace(getRequest.invoicecreationdateto)) query = query.Where(i => i.Invoicecreationdate <= DateTime.Parse(getRequest.invoicecreationdateto));
            if (!string.IsNullOrWhiteSpace(getRequest.paymentstatusdatefrom)) query = query.Where(i => i.Paymentstatusdate >= DateTime.Parse(getRequest.paymentstatusdatefrom));
            if (!string.IsNullOrWhiteSpace(getRequest.paymentstatusdateto)) query = query.Where(i => i.Paymentstatusdate <= DateTime.Parse(getRequest.paymentstatusdateto));

            if (int.Parse(getRequest.page) > 0)
            {
                var page = int.Parse(getRequest.page);
                query = query.Skip(pageLength * page);
                nextPage = page + 1;
            }

            var response = new GetInvoiceResponse()
            {
                Items = query.ToList(),
            };

            if (response.Items.Count() > pageLength)
            {
                response.Items = response.Items.Take(pageLength).ToList();
                response.Next = new PageReference { Ref = $"https://mockurl.ca/blah?page={nextPage}" };
            }

            return await Task.FromResult(response);
        }

        private InvoiceItem CreateItemFromInvoice(Invoice invoice)
        {
            var invoiceItem = new InvoiceItem
            {
                Invoicenumber = invoice.InvoiceNumber,
                Suppliernumber = invoice.SupplierNumber,
                Sitecode = "001",
                Invoicecreationdate = invoice.InvoiceDate,
                Paymentnumber = 123,
                Paygroup = invoice.PayGroup,
                Paymentdate = invoice.DateInvoiceReceived,
                Paymentamount = invoice.InvoiceAmount,
                Paymentstatus = "NEGOTIABLE",
                Paymentstatusdate = DateTime.UtcNow,
            };

            return invoiceItem;
        }
    }

    public class InvoiceParameters
    {
        public string? invoicenumber { get; set; }
        public string? suppliernumber { get; set; }
        public string? sitecode { get; set; }
        public string? paymentstatus { get; set; }
        public string? paymentnumber { get; set; }
        public string? invoicecreationdatefrom { get; set; }
        public string? invoicecreationdateto { get; set; }
        public string? paymentstatusdatefrom { get; set; }
        public string? paymentstatusdateto { get; set; }
        public string? page { get; set; }
    }
}
