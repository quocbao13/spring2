package com.c09.dating.repository;

import com.c09.dating.DTO.*;
import com.c09.dating.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Post, Long> {


    @Query(value = "SELECT   account_id as accountIdUser,\n" +
            " user.avatar as userAvatar,\n" +
            " user.background as userBackground,\n" +
            " user.full_name as fullnameUser,\n" +
            " postchung.postID as postID,\n" +
            "  postchung.idUserPost as idUserPost,\n" +
            "   postchung.postContent AS postContent,\n" +
            "    postchung.postDate AS postDate,\n" +
            "    postchung.postDelete AS postDelete,\n" +
            "    postchung.postStatus AS postStatus,\n" +
            "    postchung.countlike AS count,\n" +
            "    postchung.commentContent as commentContent,\n" +
            "postchung.commentID as commentID,\n" +
            "postchung.commentDate as commentDate,\n" +
            "postchung.commentImg as commentImg,\n" +
            "postchung.commentIDpost as commentIDpost,\n" +
            "postchung.idUserComment as idUserComment,\n" +
            " postchung.commentIDparent as commentIDparent,\n" +
            "postchung.userAvatarComment as userAvatarComment,\n" +
            "postchung.fullnameUserComment as fullnameUserComment\n" +
            "\n" +
            "from\n" +
            "user \n" +
            "LEFT join \n" +
            "(SELECT post.id as postID,\n" +
            "post.content as postContent,\n" +
            "post.create_date as postDate,\n" +
            "post.delete_flag as postDelete,\n" +
            "post.status as postStatus,\n" +
            "post.user_id as idUserPost,\n" +
            "postlike.countlike as countlike,\n" +
            "postcomment.commentContent as commentContent,\n" +
            "postcomment.commentID as commentID,\n" +
            "postcomment.commentDate as commentDate,\n" +
            "postcomment.commentImg as commentImg,\n" +
            "postcomment.commentIDpost as commentIDpost,\n" +
            "postcomment.idUserComment as idUserComment,\n" +
            " postcomment.commentIDparent as commentIDparent,\n" +
            " postcomment.userAvatarComment as userAvatarComment,\n" +
            " postcomment.fullnameUserComment as fullnameUserComment\n" +
            "FROM post \n" +
            "LEFT  join (SELECT user_id as userlike,post_id as likeidpost , count(user_id) as countlike  FROM post_like GROUP BY likeidpost) as postlike on postlike.likeidpost= post.id\n" +
            "LEFT join \n" +
            "(SELECT comment.id as commentID,\n" +
            " comment.content as commentContent,\n" +
            "comment.date as commentDate,\n" +
            "comment.img as commentImg,\n" +
            "comment.delete_flag as commentDelete,\n" +
            "comment.post_id as commentIDpost,\n" +
            "comment.user_id as idUserComment,\n" +
            "comment.comment_parent_id as commentIDparent,\n" +
            "user.avatar as userAvatarComment,\n" +
            "user.full_name as fullnameUserComment\n" +
            "FROM comment \n" +
            " JOIN user on comment.user_id=user.id)\n" +
            " as postcomment on postcomment.commentIDpost=post.id\n" +
            "\n" +
            "\n" +
            ") as postchung\n" +
            " on user.id=postchung.idUserPost\n" +
            "WHERE user.id = ?1  \n" +
            "ORDER BY postDate and commentDate DESC ", nativeQuery = true)
    List<IProfileDTO> findByAccountProfile(Long idAccount);


    @Query(value = "SELECT   account_id as accountIdUser,\n" +
            " user.avatar as userAvatar,\n" +
            " user.background as userBackground,\n" +
            " user.full_name as fullnameUser,\n" +
            " postchung.postID as postID,\n" +
            "  postchung.idUserPost as idUserPost,\n" +
            "   postchung.postContent AS postContent,\n" +
            "    postchung.postDate AS postDate,\n" +
            "    postchung.postDelete AS postDelete,\n" +
            "    postchung.postStatus AS postStatus,\n" +
            "    postchung.countlike AS count,\n" +
            "    postchung.commentContent as commentContent,\n" +
            "postchung.commentID as commentID,\n" +
            "postchung.commentDate as commentDate,\n" +
            "postchung.commentImg as commentImg,\n" +
            "postchung.commentIDpost as commentIDpost,\n" +
            "postchung.idUserComment as idUserComment,\n" +
            " postchung.commentIDparent as commentIDparent,\n" +
            "postchung.userAvatarComment as userAvatarComment,\n" +
            "postchung.fullnameUserComment as fullnameUserComment\n" +
            "\n" +
            "from\n" +
            "user \n" +
            "LEFT join \n" +
            "(SELECT post.id as postID,\n" +
            "post.content as postContent,\n" +
            "post.create_date as postDate,\n" +
            "post.delete_flag as postDelete,\n" +
            "post.status as postStatus,\n" +
            "post.user_id as idUserPost,\n" +
            "postlike.countlike as countlike,\n" +
            "postcomment.commentContent as commentContent,\n" +
            "postcomment.commentID as commentID,\n" +
            "postcomment.commentDate as commentDate,\n" +
            "postcomment.commentImg as commentImg,\n" +
            "postcomment.commentIDpost as commentIDpost,\n" +
            "postcomment.idUserComment as idUserComment,\n" +
            " postcomment.commentIDparent as commentIDparent,\n" +
            " postcomment.userAvatarComment as userAvatarComment,\n" +
            " postcomment.fullnameUserComment as fullnameUserComment\n" +
            "FROM post \n" +
            "LEFT  join (SELECT user_id as userlike,post_id as likeidpost , count(user_id) as countlike  FROM post_like GROUP BY likeidpost) as postlike on postlike.likeidpost= post.id\n" +
            "LEFT join \n" +
            "(SELECT comment.id as commentID,\n" +
            " comment.content as commentContent,\n" +
            "comment.date as commentDate,\n" +
            "comment.img as commentImg,\n" +
            "comment.delete_flag as commentDelete,\n" +
            "comment.post_id as commentIDpost,\n" +
            "comment.user_id as idUserComment,\n" +
            "comment.comment_parent_id as commentIDparent,\n" +
            "user.avatar as userAvatarComment,\n" +
            "user.full_name as fullnameUserComment\n" +
            "FROM comment \n" +
            " JOIN user on comment.user_id=user.id)\n" +
            " as postcomment on postcomment.commentIDpost=post.id)\n" +

            " as postchung\n" +
            " on user.id=postchung.idUserPost\n" +
            "WHERE user.id = ?1 and (post.status='public' or post.status='friend') \n" +
            "ORDER BY postDate and commentDate DESC ", nativeQuery = true)
    List<IProfileDTO> findByProfileIdFriend(Long idFriend);

    @Query(value = "SELECT   account_id as accountIdUser,\n" +
            " user.avatar as userAvatar,\n" +
            " user.background as userBackground,\n" +
            " user.full_name as fullnameUser,\n" +
            " postchung.postID as postID,\n" +
            "  postchung.idUserPost as idUserPost,\n" +
            "   postchung.postContent AS postContent,\n" +
            "    postchung.postDate AS postDate,\n" +
            "    postchung.postDelete AS postDelete,\n" +
            "    postchung.postStatus AS postStatus,\n" +
            "    postchung.countlike AS count,\n" +
            "    postchung.commentContent as commentContent,\n" +
            "postchung.commentID as commentID,\n" +
            "postchung.commentDate as commentDate,\n" +
            "postchung.commentImg as commentImg,\n" +
            "postchung.commentIDpost as commentIDpost,\n" +
            "postchung.idUserComment as idUserComment,\n" +
            " postchung.commentIDparent as commentIDparent,\n" +
            "postchung.userAvatarComment as userAvatarComment,\n" +
            "postchung.fullnameUserComment as fullnameUserComment\n" +
            "\n" +
            "from\n" +
            "user \n" +
            "LEFT join \n" +
            "(SELECT post.id as postID,\n" +
            "post.content as postContent,\n" +
            "post.create_date as postDate,\n" +
            "post.delete_flag as postDelete,\n" +
            "post.status as postStatus,\n" +
            "post.user_id as idUserPost,\n" +
            "postlike.countlike as countlike,\n" +
            "postcomment.commentContent as commentContent,\n" +
            "postcomment.commentID as commentID,\n" +
            "postcomment.commentDate as commentDate,\n" +
            "postcomment.commentImg as commentImg,\n" +
            "postcomment.commentIDpost as commentIDpost,\n" +
            "postcomment.idUserComment as idUserComment,\n" +
            " postcomment.commentIDparent as commentIDparent,\n" +
            " postcomment.userAvatarComment as userAvatarComment,\n" +
            " postcomment.fullnameUserComment as fullnameUserComment\n" +
            "FROM post \n" +
            "LEFT  join (SELECT user_id as userlike,post_id as likeidpost , count(user_id) as countlike  FROM post_like GROUP BY likeidpost) as postlike on postlike.likeidpost= post.id\n" +
            "LEFT join \n" +
            "(SELECT comment.id as commentID,\n" +
            " comment.content as commentContent,\n" +
            "comment.date as commentDate,\n" +
            "comment.img as commentImg,\n" +
            "comment.delete_flag as commentDelete,\n" +
            "comment.post_id as commentIDpost,\n" +
            "comment.user_id as idUserComment,\n" +
            "comment.comment_parent_id as commentIDparent,\n" +
            "user.avatar as userAvatarComment,\n" +
            "user.full_name as fullnameUserComment\n" +
            "FROM comment \n" +
            " JOIN user on comment.user_id=user.id)\n" +
            " as postcomment on postcomment.commentIDpost=post.id)\n" +

            " as postchung\n" +
            " on user.id=postchung.idUserPost\n" +
            "WHERE user.id = ?1 and (post.status='public' ) \n" +
            "ORDER BY postDate and commentDate DESC ", nativeQuery = true)
    List<IProfileDTO> findByProfileIdNoFriend(Long idTarget);

    @Query(value = "SELECT   account_id as accountIdUser,\n" +
            " user.avatar as userAvatar,\n" +
            " user.background as userBackground,\n" +
            " user.full_name as fullnameUser,\n" +
            " postchung.postID as postID,\n" +
            "  postchung.idUserPost as idUserPost,\n" +
            "   postchung.postContent AS postContent,\n" +
            "    postchung.postDate AS postDate,\n" +
            "    postchung.postDelete AS postDelete,\n" +
            "    postchung.postStatus AS postStatus,\n" +
            "    postchung.countlike AS countlike\n" +
            "from\n" +
            "user \n" +
            "LEFT join \n" +
            "(SELECT post.id as postID,\n" +
            "post.content as postContent,\n" +
            "post.create_date as postDate,\n" +
            "post.delete_flag as postDelete,\n" +
            "post.status as postStatus,\n" +
            "post.user_id as idUserPost,\n" +
            "postlike.countlike as countlike\n" +
            "FROM post \n" +
            "LEFT  join (SELECT user_id as userlike,post_id as likeidpost , count(user_id) as countlike  FROM post_like GROUP BY likeidpost) as postlike on postlike.likeidpost= post.id\n" +
            "\n" +
            "WHERE post.delete_flag=b'0'\n" +
            ") as postchung\n" +
            " on user.id=postchung.idUserPost\n" +
            "WHERE user.id = ?1 group by postID \n" +

            "ORDER BY postDate DESC ", nativeQuery = true)
    List<UserProfile> findPostByMyAccount(long idAccount);

    @Query(value = "SELECT   account_id as accountIdUser,\n" +
            " user.avatar as userAvatar,\n" +
            " user.background as userBackground,\n" +
            " user.full_name as fullnameUser,\n" +
            " postchung.postID as postID,\n" +
            "  postchung.idUserPost as idUserPost,\n" +
            "   postchung.postContent AS postContent,\n" +
            "    postchung.postDate AS postDate,\n" +
            "    postchung.postDelete AS postDelete,\n" +
            "    postchung.postStatus AS postStatus,\n" +
            "    postchung.countlike AS countlike,\n" +
            "    postchung.postImg as postImg,\n" +
            "    postchung.idImg as idImg\n" +
            "from\n" +
            "user \n" +
            "LEFT join \n" +
            "(SELECT post.id as postID,\n" +
            "post.content as postContent,\n" +
            "post.create_date as postDate,\n" +
            "post.delete_flag as postDelete,\n" +
            "post.status as postStatus,\n" +
            "post.user_id as idUserPost,\n" +
            "postlike.countlike as countlike,\n" +
            "img.url as postImg,\n" +
            "img.id as idImg\n" +
            "FROM post \n" +
            "LEFT  join (SELECT user_id as userlike,post_id as likeidpost , count(user_id) as countlike  FROM post_like GROUP BY likeidpost) as postlike on postlike.likeidpost= post.id\n" +
            "LEFT join img ON post.id= img.post_id\n" +
            "WHERE post.delete_flag=b'0' and (post.status='public' or post.status='friend')\n" +
            ") as postchung\n" +
            " on user.id=postchung.idUserPost\n" +
            "WHERE user.id = ?1 group by postID \n" +
            "ORDER BY postDate DESC", nativeQuery = true)
    List<UserProfile> findPostByUserFriend(long idAccount);

    @Query(value = "SELECT   account_id as accountIdUser,\n" +
            " user.avatar as userAvatar,\n" +
            " user.background as userBackground,\n" +
            " user.full_name as fullnameUser,\n" +
            " postchung.postID as postID,\n" +
            "  postchung.idUserPost as idUserPost,\n" +
            "   postchung.postContent AS postContent,\n" +
            "    postchung.postDate AS postDate,\n" +
            "    postchung.postDelete AS postDelete,\n" +
            "    postchung.postStatus AS postStatus,\n" +
            "    postchung.countlike AS countlike,\n" +
            "    postchung.postImg as postImg,\n" +
            "    postchung.idImg as idImg\n" +
            "from\n" +
            "user \n" +
            "LEFT join \n" +
            "(SELECT post.id as postID,\n" +
            "post.content as postContent,\n" +
            "post.create_date as postDate,\n" +
            "post.delete_flag as postDelete,\n" +
            "post.status as postStatus,\n" +
            "post.user_id as idUserPost,\n" +
            "postlike.countlike as countlike,\n" +
            "img.url as postImg,\n" +
            "img.id as idImg\n" +
            "FROM post \n" +
            "LEFT  join (SELECT user_id as userlike,post_id as likeidpost , count(user_id) as countlike  FROM post_like GROUP BY likeidpost) as postlike on postlike.likeidpost= post.id\n" +
            "LEFT join img ON post.id= img.post_id\n" +
            "WHERE post.delete_flag=b'0' and post.status ='public' \n" +
            ") as postchung\n" +
            " on user.id=postchung.idUserPost\n" +
            "WHERE user.id = ?1 group by postID \n" +
                    "ORDER BY postDate DESC", nativeQuery = true)
    List<UserProfile> findPostByUserNoFriend(long idAccount);


}
