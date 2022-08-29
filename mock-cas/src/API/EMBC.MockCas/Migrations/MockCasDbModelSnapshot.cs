﻿// <auto-generated />
using System;
using EMBC.MockCas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EMBC.MockCas.Migrations
{
    [DbContext(typeof(MockCasDb))]
    partial class MockCasDbModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("EMBC.MockCas.Models.GetSupplierResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Businessnumber")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Lastupdated")
                        .HasColumnType("TEXT");

                    b.Property<string>("Providerid")
                        .HasColumnType("TEXT");

                    b.Property<string>("Sin")
                        .HasColumnType("TEXT");

                    b.Property<string>("Standardindustryclassification")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<string>("Subcategory")
                        .HasColumnType("TEXT");

                    b.Property<string>("Suppliername")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Suppliernumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Supplierprotected")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.Invoice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AddressLine1")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressLine2")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressLine3")
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<string>("CurrencyCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("DateGoodsReceived")
                        .HasColumnType("TEXT");

                    b.Property<string>("DateInvoiceReceived")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("EftAdviceFlag")
                        .HasColumnType("TEXT");

                    b.Property<string>("GlDate")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("InteracEmail")
                        .HasColumnType("TEXT");

                    b.Property<string>("InteracMobileCountryCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("InteracMobileNumber")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("InvoiceAmount")
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceBatchName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceDate")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("NameLine1")
                        .HasColumnType("TEXT");

                    b.Property<string>("NameLine2")
                        .HasColumnType("TEXT");

                    b.Property<string>("PayAloneFlag")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PayGroup")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PaymentAdviceComments")
                        .HasColumnType("TEXT");

                    b.Property<string>("PostalCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("Province")
                        .HasColumnType("TEXT");

                    b.Property<string>("QualifiedReceiver")
                        .HasColumnType("TEXT");

                    b.Property<string>("RemittanceCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RemittanceMessage1")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RemittanceMessage2")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RemittanceMessage3")
                        .HasColumnType("TEXT");

                    b.Property<string>("SpecialHandling")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SupplierNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SupplierSiteNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Terms")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.InvoiceItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cleareddate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Invoicecreationdate")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Invoicenumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Paygroup")
                        .HasColumnType("TEXT");

                    b.Property<decimal?>("Paymentamount")
                        .HasColumnType("TEXT");

                    b.Property<string>("Paymentdate")
                        .HasColumnType("TEXT");

                    b.Property<int?>("Paymentnumber")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Paymentstatus")
                        .HasColumnType("TEXT");

                    b.Property<string>("Paymentstatusdate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Sitecode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Suppliernumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Systemdate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Voidreason")
                        .HasColumnType("TEXT");

                    b.Property<string>("voiddate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("InvoiceItems");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.InvoiceLineDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("DefaultDistributionAccount")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("DistributionSupplier")
                        .HasColumnType("TEXT");

                    b.Property<string>("Info1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Info2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Info3")
                        .HasColumnType("TEXT");

                    b.Property<int?>("InvoiceId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("InvoiceLineAmount")
                        .HasColumnType("TEXT");

                    b.Property<int>("InvoiceLineNumber")
                        .HasColumnType("INTEGER");

                    b.Property<string>("InvoiceLineType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LineCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TaxClassificationCode")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("InvoiceId");

                    b.ToTable("InvoiceLineDetails");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.Supplieraddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AccountNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressLine1")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressLine2")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressLine3")
                        .HasColumnType("TEXT");

                    b.Property<string>("BankNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("BranchNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<string>("EftAdvicePref")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastUpdated")
                        .HasColumnType("TEXT");

                    b.Property<string>("PostalCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Province")
                        .HasColumnType("TEXT");

                    b.Property<string>("SiteProtected")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SupplierId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Suppliersitecode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SupplierId");

                    b.ToTable("SupplierAddress");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.InvoiceLineDetail", b =>
                {
                    b.HasOne("EMBC.MockCas.Models.Invoice", "Invoice")
                        .WithMany("InvoiceLineDetails")
                        .HasForeignKey("InvoiceId");

                    b.Navigation("Invoice");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.Supplieraddress", b =>
                {
                    b.HasOne("EMBC.MockCas.Models.GetSupplierResponse", "Supplier")
                        .WithMany("SupplierAddress")
                        .HasForeignKey("SupplierId");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.GetSupplierResponse", b =>
                {
                    b.Navigation("SupplierAddress");
                });

            modelBuilder.Entity("EMBC.MockCas.Models.Invoice", b =>
                {
                    b.Navigation("InvoiceLineDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
