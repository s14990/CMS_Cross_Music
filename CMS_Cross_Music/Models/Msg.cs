using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Msg
    {
        public int IdMsg { get; set; }
        public string Text { get; set; }
        public DateTime? MsgDate { get; set; }
        public int UserIdAuthor { get; set; }
        public int UserIdTarger { get; set; }

        public Usr UserIdAuthorNavigation { get; set; }
        public Usr UserIdTargerNavigation { get; set; }
    }
}
