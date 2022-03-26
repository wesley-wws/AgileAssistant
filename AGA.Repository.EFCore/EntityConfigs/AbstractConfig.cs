using AGA.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Repository.EFCore.EntityConfigs;

internal abstract class AbstractConfig<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : AbstractEntity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        ConfigureEntity(builder);
    }

    public abstract void ConfigureEntity(EntityTypeBuilder<TEntity> builder);
}

internal abstract class AbstractConfig<TEntity, TId> : AbstractConfig<TEntity> where TEntity : AbstractEntity<TId>
{
    protected bool _isKeyInitialized = false;
    public override void Configure(EntityTypeBuilder<TEntity> builder)
    {
        base.Configure(builder);
        if (!_isKeyInitialized)
        {
            builder.HasKey(x => x.Id);
            _isKeyInitialized = true;
        }
    }
}


internal abstract class AbstractConfig<TEntity, TId, TPhysicalKey> : AbstractConfig<TEntity, TId> where TEntity : AbstractEntity<TId, TPhysicalKey>
{
    public override void Configure(EntityTypeBuilder<TEntity> builder)
    {
        base.Configure(builder);
        builder.HasKey(x => x.PhysicalKey);
        _isKeyInitialized = true;
    }
}

