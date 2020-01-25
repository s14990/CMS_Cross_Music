using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Mediafile
    {
        public Mediafile()
        {
            Mediapost = new HashSet<Mediapost>();
        }

        public int IdFile { get; set; }
        public string MediaType { get; set; }
        public string MediaName { get; set; }
        public string FlName { get; set; }
        public string FlType { get; set; }
        public string FlLink { get; set; }
        public string MediaDescription { get; set; }
        public DateTime? MediaDate { get; set; }
        public int UserIdUser { get; set; }

        public ICollection<Mediapost> Mediapost { get; set; }
    }
}
