using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CMS_Cross_Music.Models
{
    public partial class CrossMusicContext : DbContext
    {
        public CrossMusicContext()
        {
        }

        public CrossMusicContext(DbContextOptions<CrossMusicContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Friendlist> Friendlist { get; set; }
        public virtual DbSet<Likes> Likes { get; set; }
        public virtual DbSet<Mediafile> Mediafile { get; set; }
        public virtual DbSet<Mediapost> Mediapost { get; set; }
        public virtual DbSet<Msg> Msg { get; set; }
        public virtual DbSet<Pass> Pass { get; set; }
        public virtual DbSet<Pt> Pt { get; set; }
        public virtual DbSet<Sesn> Sesn { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<Ufl> Ufl { get; set; }
        public virtual DbSet<Usr> Usr { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:cmsproject.database.windows.net,1433;Initial Catalog=CrossMusic;User ID=cmsAdmin;Password=2019CMS_Project;MultipleActiveResultSets =False;Encrypt=True;TrustServerCertificate=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.IdComment);

                entity.ToTable("comment");

                entity.Property(e => e.IdComment).HasColumnName("id_comment");

                entity.Property(e => e.CommentDate)
                    .HasColumnName("comment_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.CommentHtml)
                    .HasColumnName("comment_html")
                    .HasMaxLength(500);

                entity.Property(e => e.MediapostIdPost).HasColumnName("Mediapost_id_post");

                entity.Property(e => e.UserIdUser).HasColumnName("User_id_user");

                entity.HasOne(d => d.MediapostIdPostNavigation)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.MediapostIdPost)
                    .HasConstraintName("comment_mediapost_fk");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("comment_user_fk");
            });

            modelBuilder.Entity<Friendlist>(entity =>
            {
                entity.HasKey(e => e.IdFl);

                entity.ToTable("friendlist");

                entity.HasIndex(e => e.UserIdUser)
                    .HasName("friendlist__idx")
                    .IsUnique();

                entity.Property(e => e.IdFl).HasColumnName("id_fl");

                entity.Property(e => e.UserIdUser).HasColumnName("user_id_user");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithOne(p => p.Friendlist)
                    .HasForeignKey<Friendlist>(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("friendlist_user_fk");
            });

            modelBuilder.Entity<Likes>(entity =>
            {
                entity.HasKey(e => e.IdLike);

                entity.ToTable("likes");

                entity.Property(e => e.IdLike).HasColumnName("id_like");

                entity.Property(e => e.MediapostIdPost).HasColumnName("mediapost_id_post");

                entity.Property(e => e.UserIdUser).HasColumnName("user_id_user");

                entity.HasOne(d => d.MediapostIdPostNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.MediapostIdPost)
                    .HasConstraintName("likes_mediapost_fk");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("likes_user_fk");
            });

            modelBuilder.Entity<Mediafile>(entity =>
            {
                entity.HasKey(e => e.IdFile);

                entity.ToTable("mediafile");

                entity.Property(e => e.IdFile).HasColumnName("id_file");

                entity.Property(e => e.FlLink)
                    .HasColumnName("fl_link")
                    .HasMaxLength(200);

                entity.Property(e => e.FlName)
                    .HasColumnName("fl_name")
                    .HasMaxLength(50);

                entity.Property(e => e.FlType)
                    .HasColumnName("fl_type")
                    .HasMaxLength(50);

                entity.Property(e => e.MediaDate)
                    .HasColumnName("media_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.MediaDescription)
                    .HasColumnName("media_description")
                    .HasMaxLength(100);

                entity.Property(e => e.MediaName)
                    .HasColumnName("media_name")
                    .HasMaxLength(50);

                entity.Property(e => e.MediaType)
                    .HasColumnName("media_type")
                    .HasMaxLength(50);

                entity.Property(e => e.UserIdUser).HasColumnName("User_id_user");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithMany(p => p.Mediafile)
                    .HasForeignKey(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("usr_mediafile_fk");
            });

            modelBuilder.Entity<Mediapost>(entity =>
            {
                entity.HasKey(e => e.IdPost);

                entity.ToTable("mediapost");

                entity.Property(e => e.IdPost).HasColumnName("id_post");

                entity.Property(e => e.MediaFileIdFile).HasColumnName("MediaFile_id_file");

                entity.Property(e => e.PostDate)
                    .HasColumnName("post_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.PostDescription)
                    .HasColumnName("post_description")
                    .HasMaxLength(1000);

                entity.Property(e => e.PostTitle)
                    .HasColumnName("post_title")
                    .HasMaxLength(100);

                entity.Property(e => e.UserIdUser).HasColumnName("User_id_user");

                entity.HasOne(d => d.MediaFileIdFileNavigation)
                    .WithMany(p => p.Mediapost)
                    .HasForeignKey(d => d.MediaFileIdFile)
                    .HasConstraintName("mediapost_mediafile_fk");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithMany(p => p.Mediapost)
                    .HasForeignKey(d => d.UserIdUser)
                    .HasConstraintName("mediapost_user_fk");
            });

            modelBuilder.Entity<Msg>(entity =>
            {
                entity.HasKey(e => e.IdMsg);

                entity.ToTable("msg");

                entity.Property(e => e.IdMsg).HasColumnName("id_msg");

                entity.Property(e => e.MsgDate)
                    .HasColumnName("msg_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Text)
                    .HasColumnName("text")
                    .HasMaxLength(500);

                entity.Property(e => e.UserIdAuthor).HasColumnName("User_id_author");

                entity.Property(e => e.UserIdTarger).HasColumnName("User_id_targer");

                entity.HasOne(d => d.UserIdAuthorNavigation)
                    .WithMany(p => p.MsgUserIdAuthorNavigation)
                    .HasForeignKey(d => d.UserIdAuthor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("msg_user_author_fk");

                entity.HasOne(d => d.UserIdTargerNavigation)
                    .WithMany(p => p.MsgUserIdTargerNavigation)
                    .HasForeignKey(d => d.UserIdTarger)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("msg_user_targer_fk");
            });

            modelBuilder.Entity<Pass>(entity =>
            {
                entity.HasKey(e => e.IdPass);

                entity.ToTable("pass");

                entity.HasIndex(e => e.UserIdUser)
                    .HasName("password__idx")
                    .IsUnique();

                entity.Property(e => e.IdPass).HasColumnName("id_pass");

                entity.Property(e => e.Hash)
                    .HasColumnName("hash")
                    .HasMaxLength(512);

                entity.Property(e => e.UserIdUser).HasColumnName("User_id_user");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithOne(p => p.Pass)
                    .HasForeignKey<Pass>(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pass_user_fk");
            });

            modelBuilder.Entity<Pt>(entity =>
            {
                entity.HasKey(e => e.IdPt);

                entity.ToTable("pt");

                entity.Property(e => e.IdPt).HasColumnName("id_pt");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.TagId).HasColumnName("tag_id");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Pt)
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("FK_pt_post");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.Pt)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_pt_tag");
            });

            modelBuilder.Entity<Sesn>(entity =>
            {
                entity.HasKey(e => e.IdSesn);

                entity.ToTable("sesn");

                entity.Property(e => e.IdSesn).HasColumnName("id_sesn");

                entity.Property(e => e.EndDate)
                    .HasColumnName("end_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.StartDate)
                    .HasColumnName("start_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserIdUser).HasColumnName("user_id_user");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithMany(p => p.Sesn)
                    .HasForeignKey(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("sesn_user_fk");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasKey(e => e.IdTag);

                entity.ToTable("tag");

                entity.Property(e => e.IdTag).HasColumnName("id_tag");

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasColumnName("tag_name")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Ufl>(entity =>
            {
                entity.HasKey(e => e.IdUfl);

                entity.ToTable("ufl");

                entity.Property(e => e.IdUfl).HasColumnName("id_ufl");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.FriendlistIdFl).HasColumnName("friendlist_id_fl");

                entity.Property(e => e.UserIdUser).HasColumnName("user_id_user");

                entity.HasOne(d => d.FriendlistIdFlNavigation)
                    .WithMany(p => p.Ufl)
                    .HasForeignKey(d => d.FriendlistIdFl)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ufl_friendlist_fk");

                entity.HasOne(d => d.UserIdUserNavigation)
                    .WithMany(p => p.Ufl)
                    .HasForeignKey(d => d.UserIdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ufl_user_fk");
            });

            modelBuilder.Entity<Usr>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.ToTable("usr");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.UserConfirmed).HasColumnName("user_confirmed");

                entity.Property(e => e.UserEmail)
                    .HasColumnName("user_email")
                    .HasMaxLength(50);

                entity.Property(e => e.UserName)
                    .HasColumnName("user_name")
                    .HasMaxLength(50);

                entity.Property(e => e.UserRank).HasColumnName("user_rank");

                entity.Property(e => e.UserStatus)
                    .HasColumnName("user_status")
                    .HasMaxLength(30);
            });
        }
    }
}
