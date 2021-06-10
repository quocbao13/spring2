package com.c09.dating.repository;

import com.c09.dating.DTO.FriendListCheck;
import com.c09.dating.DTO.ListFriend;
import com.c09.dating.DTO.MutualFriendDTO;

import com.c09.dating.entity.Relationship;
import com.c09.dating.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship,Long> {
    /***********************Duong Nguyen Bao***********************/
    /**
     * send friend request
     * created by BaoDN
     */
    @Transactional
    @Modifying
    @Query(value = "insert into relationship(user_id, friend_id, status_id) " +
            "values (?1, ?2, 3)",
            nativeQuery = true)
    void addFriend(Long userId, Long friendId);
    @Transactional
    @Modifying
    @Query(value = "insert into relationship(user_id, friend_id, status_id) " +
            "values (?2, ?1, 4)",
            nativeQuery = true)
    void addFriend2(Long userId, Long friendId);
    /**
     * show list of friend requests and amount of mutual friend
     * created by BaoDN
     */
    @Query(value = "select user.id as userId, user.full_name as fullName, user.avatar, " +
            "( select count(user.id) " +
            "from user " +
            "where user.id in " +
            "( select relationship.friend_id " +
            "from relationship " +
            "where relationship.user_id = userId " +
            "and (relationship.status_id = 1 or relationship.status_id = 2) ) " +
            "and user.id in " +
            "( select relationship.friend_id " +
            "from relationship " +
            "where relationship.user_id = ?1 " +
            "and (relationship.status_id = 1 or relationship.status_id = 2) ) ) as mutualFriends, " +
            "( select relationship.status_id " +
            "from relationship " +
            "where relationship.user_id = ?1 " +
            "and relationship.friend_id = userId ) as status " +
            "from user " +
            "join relationship on user.id = relationship.friend_id " +
            "where relationship.status_id = 4 and relationship.user_id = ?1 " +
            "limit ?2",
            nativeQuery = true)
    List<MutualFriendDTO> getFriendRequestList(Long userId, Long loaded);
    /**
     * count amount of friend request
     * created by BaoDN
     */
    @Query(value = "select count(user.id) " +
            "from user " +
            "join relationship on user.id = relationship.friend_id " +
            "where relationship.status_id = 4 and relationship.user_id = ?1",
            nativeQuery = true)
    Long countFriendRequest(Long id);
    /**
     * Danh sách lời mời tồn tại
     * created by BaoDN
     */
    @Query(value = "select user.id " +
            "from user " +
            "join relationship on user.id = relationship.friend_id " +
            "where (relationship.status_id = 4 or relationship.status_id = 3) and relationship.user_id = ?1",
            nativeQuery = true)
    List<Long> existFriendRequest(Long id);
    /**
     * confirm friend request
     * created by BaoDN
     */
    @Transactional
    @Modifying
    @Query(value = "update relationship " +
            "set relationship.status_id = 1 " +
            "where relationship.user_id = ?1 and relationship.friend_id = ?2 " +
            "or relationship.user_id = ?2 and relationship.friend_id = ?1",
            nativeQuery = true)
    void confirmFriend(Long userId, Long friendId);
    /**
     * delete friend request
     * created by BaoDN
     */
    @Transactional
    @Modifying
    @Query(value = "delete from relationship " +
            "where relationship.user_id = ?1 and relationship.friend_id = ?2 " +
            "or relationship.user_id = ?2 and relationship.friend_id = ?1",
            nativeQuery = true)
    void deleteFriendRequest(Long userId, Long friendId);
    /**
     * Check status
     * created by BaoDN
     */
    @Query(value = "select status_id " +
            "from relationship " +
            "where relationship.user_id = ?1 and relationship.friend_id = ?2",
            nativeQuery = true)
    Long getStatusId(Long userId, Long friendId);

    //Lấy user để test
    @Query("select u from User u where u.id = ?1")
    User getUser(Long id);
    /***********************The End***********************/

    //    *******************6868******Hưng làm phần danh sách bạn bè và gợi ý and xóa
    @Query(value = "select  user.avatar as avatar, \n" +
            "             user.full_name as fullName, user.description_user as describeUser,relationship.status_id as status ,user.id as userID, relationship.friend_id as friendID,\n" +
            "             (select count(user.id) \n" +
            "             from user\n" +
            "             where user.id in ( select relationship.friend_id from relationship where relationship.user_id = userID)\n" +
            "             and user.id in ( select relationship.friend_id from relationship where relationship.user_id = ?1) ) as mutualFriends\n" +
            "             from user\n" +
            "             join relationship on user.id = relationship.user_id\n" +
            "             join account on account.id=user.account_id\n" +
            "             where user.id != ?1 and relationship.friend_id = ?1 and relationship.status_id =1 limit ?2", nativeQuery = true)
    List<MutualFriendDTO> getAllRelationship(Long id , Integer page);


    @Query(value = "select user.id as accountID,  user.avatar as avatar, user.full_name as username\n" +
            "from user \n" +
            "where user.id = ?1", nativeQuery = true)
    ListFriend getById(Integer id);

    @Query(value = "select user.id as userID,  user.avatar as avatar, user.full_name as username\n" +
            "from user \n" +
            "where user.id = ?1", nativeQuery = true)
    MutualFriendDTO getByIdAcount(Long id);

    @Modifying
    @Transactional
    @Query(value = "delete from relationship where relationship.user_id = ?1 and relationship.friend_id = ?2", nativeQuery = true)
    void delNewFriend(Long UserID, Long friendID);

    @Modifying
    @Transactional
    @Query(value = "delete from relationship where relationship.user_id = ?2 and relationship.friend_id = ?1", nativeQuery = true)
    void delNewFriend2(Long UserID, Long friendID);

    @Modifying
    @Transactional
    @Query(value = "update relationship set relationship.status_id = 5 where relationship.user_id = ?2 and relationship.friend_id = ?1 ", nativeQuery = true)
    void blockFriend(Long UserID, Long friendID);

    @Modifying
    @Transactional
    @Query(value = "update relationship set relationship.status_id = 5 where relationship.user_id = ?1 and relationship.friend_id = ?2", nativeQuery = true)
    void blockFriend1(Long UserID, Long friendID);

    @Transactional
    @Query(value = "SELECT distinct\n" +
            "    bang1.iduser,\n" +
            "    bang1.frienduser,\n" +
            "    bang2.iduser2,\n" +
            "    bang2.frienduser2 as userID,\n" +
            "    user.avatar as avatar,\n" +
            "    user.full_name as fullName\n" +
            "FROM\n" +
            "    (SELECT\n" +
            "        user_id AS iduser, friend_id AS frienduser\n" +
            "    FROM\n" +
            "        relationship\n" +
            "    WHERE\n" +
            "        user_id = ?1) AS bang1\n" +
            "       LEFT JOIN\n" +
            "    (SELECT\n" +
            "        user_id AS iduser2, friend_id AS frienduser2 \n" +
            "    FROM\n" +
            "        relationship) AS bang2  \n" +
            "        ON frienduser = iduser2\n" +
            "        join user on user.id = frienduser2 \n" +
            "        where frienduser2 not in (select friend_id from relationship where user_id= ?1) and\n" +
            "        frienduser2 != ?1  group by frienduser2", nativeQuery = true)
    List<MutualFriendDTO> getAllFriend(Long id);


//    *****************************8686****Hết****************************************




@Transactional
@Query(value = "SELECT relationship.user_id as userID, relationship.friend_id as friendID,relationship.status_id as idStatusFriend, status_relationship.name as statusFriend, accountUser.idAccount as idAccountUser FROM relationship \n" +
        "JOIN\n" +
        "(SELECT account.id as idAccount, user.id as useraccountID FROM account JOIN user ON user.account_id = account.id) as accountUser on accountUser.useraccountID=relationship.user_id\n" +
        "join \n" +
        "user on relationship.friend_id = user.id\n" +
        "join status_relationship on status_relationship.id=relationship.status_id\n" +
        "WHERE accountUser.idAccount = ?1 and relationship.status_id=1", nativeQuery = true)
    List<FriendListCheck>getAccountFriendList(Long idAccount);

// Quoc bao
@Query(value = "select  user.avatar as avatar, \n" +
        "             user.full_name as fullName, user.description_user as describeUser,relationship.status_id as status ,user.id as userID, relationship.friend_id as friendID,\n" +
        "             (select count(user.id) \n" +
        "             from user\n" +
        "             where user.id in ( select relationship.friend_id from relationship where relationship.user_id = userID)\n" +
        "             and user.id in ( select relationship.friend_id from relationship where relationship.user_id = ?1) ) as mutualFriends\n" +
        "             from user\n" +
        "             join relationship on user.id = relationship.user_id\n" +
        "             join account on account.id=user.account_id\n" +
        "             where user.id != ?1 and relationship.friend_id = ?1", nativeQuery = true)
    List<MutualFriendDTO> getAllRelationshipForRecommend(Long id);


    @Query(value = "SELECT relationship.user_id as userID, relationship.friend_id as friendID,relationship.status_id as idStatusFriend, status_relationship.name as statusFriend, accountUser.idAccount as idAccountUser FROM relationship \n" +
            "JOIN\n" +
            "(SELECT account.id as idAccount, user.id as useraccountID FROM account JOIN user ON user.account_id = account.id) as accountUser on accountUser.useraccountID=relationship.user_id\n" +
            "join \n" +
            "user on relationship.friend_id = user.id\n" +
            "join status_relationship on status_relationship.id=relationship.status_id\n" +
            "WHERE accountUser.idAccount = ?1 and relationship.friend_id=?2 and relationship.status_id=1", nativeQuery = true)
   FriendListCheck checkFriend(Long idAccount , Long idTarget );

}
