using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain;

/// <summary>
/// Base Abstract bomain entity class.
/// </summary>
public abstract class AbstractEntity
{

}

/// <summary>
/// Base Abstract bomain entity class with logic Id.
/// </summary>
/// <typeparam name="TId">Logic Id</typeparam>
public abstract class AbstractEntity<TId> : AbstractEntity
{
    public TId Id { get; init; }

    protected AbstractEntity(TId id)
    {
        Id = id;
    }
}

/// <summary>
/// Base Abstract bomain entity class with logic Id and Database Physical Key(Id)
/// </summary>
/// <typeparam name="TId">Logic Id</typeparam>
/// <typeparam name="TPhysicalKey">Database Physical Key(Id)</typeparam>
public abstract class AbstractEntity<TId, TPhysicalKey> : AbstractEntity<TId>
{
    protected AbstractEntity(TId id) : base(id)
    {
    }

    /// <summary>
    /// use this field as Self-incrementing primary key as physcial id in database
    /// </summary>
    public TPhysicalKey? PhysicalKey { get; set; }
}