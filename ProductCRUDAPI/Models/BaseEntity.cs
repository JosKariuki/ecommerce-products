using System;
using System.Collections.Generic;

namespace ProductCRUDAPI.Models
{
    public partial class BaseEntity
    {
        public BaseEntity()
        {
            DateCreated = DateTime.UtcNow;
            DateUpdated = DateTime.UtcNow;
        }
        
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        // public bool IsDeleted { get; set; }
    }
}
