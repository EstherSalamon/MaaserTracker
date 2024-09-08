using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class Income
    {
        public int Id { get; set; }
        public int SourceId { get; set; }
        public string SourceName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
