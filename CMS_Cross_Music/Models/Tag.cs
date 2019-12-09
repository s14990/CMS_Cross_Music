using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Tag
    {
        public Tag()
        {
            Pt = new HashSet<Pt>();
        }

        public int IdTag { get; set; }
        public string TagName { get; set; }

        public ICollection<Pt> Pt { get; set; }
    }
}
