using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Friendlist
    {
        public Friendlist()
        {
            Ufl = new HashSet<Ufl>();
        }

        public int IdFl { get; set; }
        public int UserIdUser { get; set; }

        public Usr UserIdUserNavigation { get; set; }
        public ICollection<Ufl> Ufl { get; set; }
    }
}
