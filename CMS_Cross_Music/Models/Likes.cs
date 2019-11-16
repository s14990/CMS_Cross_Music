using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Likes
    {
        public int IdLike { get; set; }
        public int UserIdUser { get; set; }
        public int MediapostIdPost { get; set; }

        public Mediapost MediapostIdPostNavigation { get; set; }
        public Usr UserIdUserNavigation { get; set; }
    }
}
