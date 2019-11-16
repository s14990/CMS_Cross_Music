using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Ufl
    {
        public int IdUfl { get; set; }
        public bool? Active { get; set; }
        public int FriendlistIdFl { get; set; }
        public int UserIdUser { get; set; }

        public Friendlist FriendlistIdFlNavigation { get; set; }
        public Usr UserIdUserNavigation { get; set; }
    }
}
