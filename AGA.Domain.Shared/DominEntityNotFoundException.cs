using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Shared;

[Serializable]
public class DominEntityNotFoundException : Exception
{
    public DominEntityNotFoundException(string entity, Exception? innerException = null)
        : base($"Not Found Entity {entity}.", innerException)
    {
    }

    protected DominEntityNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
}
