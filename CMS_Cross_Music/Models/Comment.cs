using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Comment
    {
        public int IdComment { get; set; }
        public string CommentHtml { get; set; }
        public DateTime? CommentDate { get; set; }
        public int UserIdUser { get; set; }

        public Usr UserIdUserNavigation { get; set; }
    }
}
