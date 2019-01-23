using System;
using Microsoft.EntityFrameworkCore;
using CompupowTesting.Models;

namespace CompupowTesting.Data
{
    public class db_CompupowContext: DbContext
    {

        public db_CompupowContext(DbContextOptions<db_CompupowContext> options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmpAddr> EmpAddrs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmCode);

                entity.ToTable("Employee");

                entity.Property(e => e.EmCode).HasColumnName("EM_CODE")
                    .HasColumnType("char(10)");

                entity.Property(e => e.EmTname).HasColumnName("EM_TNAME")
                    .HasColumnType("char(40)");

                entity.Property(e => e.EmEname).HasColumnName("EM_ENAME")
                    .HasColumnType("char(40)");

                entity.Property(e => e.EmBirthdate).HasColumnName("EM_BIRTHDATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.EmChild).HasColumnName("EM_CHILD")
                    .HasDefaultValue(0);

                entity.Property(e => e.Usr).HasColumnName("USR")
                    .HasColumnType("char(10)");

                entity.Property(e => e.Smpt).HasColumnName("SMPT")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<EmpAddr>(entity =>
            {
                entity.HasKey(e => e.ID);

                entity.ToTable("Empaddr");

                entity.Property(e => e.ID).UseSqlServerIdentityColumn();

                entity.Property(e => e.EmCode).HasColumnName("EM_CODE")
                    .HasColumnType("char(10)");

                entity.Property(e => e.EmType).HasColumnName("EM_TYPE")
                    .HasColumnType("char(1)");

                entity.Property(e => e.EmAddr1).HasColumnName("EM_ADDR1")
                    .HasColumnType("char(60)");

                entity.Property(e => e.EmAddr2).HasColumnName("EM_ADDR2")
                    .HasColumnType("char(60)");

                entity.Property(e => e.Usr).HasColumnName("USR")
                    .HasColumnType("char(10)");

                entity.Property(e => e.Smrt).HasColumnName("SMRT")
                    .HasColumnType("datetime");
            });
        }

    }
}
