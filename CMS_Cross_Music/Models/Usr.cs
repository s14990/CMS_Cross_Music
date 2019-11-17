using System;
using System.Collections.Generic;

namespace CMS_Cross_Music.Models
{
    public partial class Usr
    {
        public Usr()
        {
            Comment = new HashSet<Comment>();
            Likes = new HashSet<Likes>();
            Mediafile = new HashSet<Mediafile>();
            Mediapost = new HashSet<Mediapost>();
            MsgUserIdAuthorNavigation = new HashSet<Msg>();
            MsgUserIdTargerNavigation = new HashSet<Msg>();
            Sesn = new HashSet<Sesn>();
            Ufl = new HashSet<Ufl>();
        }

        public int IdUser { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int? UserRank { get; set; }
        public string UserStatus { get; set; }
        public bool? UserConfirmed { get; set; }

        public Friendlist Friendlist { get; set; }
        public Pass Pass { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<Likes> Likes { get; set; }
        public ICollection<Mediafile> Mediafile { get; set; }
        public ICollection<Mediapost> Mediapost { get; set; }
        public ICollection<Msg> MsgUserIdAuthorNavigation { get; set; }
        public ICollection<Msg> MsgUserIdTargerNavigation { get; set; }
        public ICollection<Sesn> Sesn { get; set; }
        public ICollection<Ufl> Ufl { get; set; }
    }
}
