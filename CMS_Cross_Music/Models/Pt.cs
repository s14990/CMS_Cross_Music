using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Pt
    {
        public int IdPt { get; set; }
        public int PostId { get; set; }
        public int TagId { get; set; }

        public Mediapost Post { get; set; }
        public Tag Tag { get; set; }
    }
}
