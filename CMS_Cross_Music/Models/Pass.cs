using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Pass
    {
        public int IdPass { get; set; }
        public string Hash { get; set; }
        public int UserIdUser { get; set; }

        public Usr UserIdUserNavigation { get; set; }
    }
}
