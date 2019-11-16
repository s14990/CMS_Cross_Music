using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Sesn
    {
        public int IdSesn { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int UserIdUser { get; set; }

        public Usr UserIdUserNavigation { get; set; }
    }
}
