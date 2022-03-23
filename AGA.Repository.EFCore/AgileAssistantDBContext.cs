using System;
using System.Collections.Generic;
using System.Reflection;
using AGA.Domain.Decks;
using Microsoft.EntityFrameworkCore;

namespace AGA.Repository.EFCore;

public class AgileAssistantDBContext : DbContext
{
    public DbSet<Poker> Pokers { get; set; } = null!;

    public DbSet<Deck> Decks { get; set; } = null!;

    public AgileAssistantDBContext(DbContextOptions options) 
        : base(options)
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.LogTo(Console.WriteLine);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
