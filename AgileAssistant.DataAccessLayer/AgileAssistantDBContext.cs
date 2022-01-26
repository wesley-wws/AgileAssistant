using System;
using System.Collections.Generic;
using System.Reflection;
using AgileAssistant.DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgileAssistant.DataAccessLayer
{
    public class AgileAssistantDBContext : DbContext
    {
        public DbSet<Poker> Pokers { get; set; }

        public DbSet<PokerDeck> PokerDecks { get; set; }

        public string DbPath { get; }

        public AgileAssistantDBContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}