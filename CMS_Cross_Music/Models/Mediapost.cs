using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Mediapost
    {
        public Mediapost()
        {
            Likes = new HashSet<Likes>();
        }

        public int IdPost { get; set; }
        public string PostHtml { get; set; }
        public DateTime? PostDate { get; set; }
        public int MediaFileIdFile { get; set; }
        public int UserIdUser { get; set; }

        public Mediafile MediaFileIdFileNavigation { get; set; }
        public Usr UserIdUserNavigation { get; set; }
        public ICollection<Likes> Likes { get; set; }
    }
}
