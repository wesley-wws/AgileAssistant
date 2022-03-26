using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGA.Domain.Shared;
public class DominEntityNotFoundException : Exception
{
    public DominEntityNotFoundException(string entity, Exception? innerException = null)
        : base($"Not Found Entity {entity}.", innerException)
    {

    }
}
