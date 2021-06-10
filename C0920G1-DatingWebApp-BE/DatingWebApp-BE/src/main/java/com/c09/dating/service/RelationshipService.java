package com.c09.dating.service;



import com.c09.dating.DTO.*;

import com.c09.dating.entity.User;


import com.c09.dating.DTO.*;
import com.c09.dating.DTO.FriendListCheck;
import com.c09.dating.entity.User;

import java.util.List;

public interface RelationshipService {
    /***********************Duong Nguyen Bao***********************/
    List<MutualFriendDTO> getFriendRequestList(Long userId, Long loaded);
    void addFriend(Long userId, Long friendId);
    void confirmFriend(Long userId, Long friendId);
    void deleteFriendRequest(Long userId, Long friendId);
    Long getStatusId(Long userId, Long friendId);
    Long countFriendRequest(Long id);
    List<Long> existFriendRequest(Long id);

    //Lấy user để test
    User getUser(Long id);
    /***********************The End***********************/

    //***************************Hưng viết chức năng gợi ý kết bạn và danh sách bạn bè xóa bạn bè***//
    List<MutualFriendDTO> getAllMadeFriends(Long id , Integer page);
    ListFriend getFriendById(Integer id);
    MutualFriendDTO getFriendByIdAccount(Long id);
    void delNewFriend(Long UserID, Long FriendID);
    void delNewFriend2(Long UserID, Long FriendID);
    List<MutualFriendDTO> getFriendSuggestion(Long id);
    void blockFriend(Long UserID, Long FriendID);
    void blockFriend1(Long UserID, Long FriendID);

    //    *************** Hết *********************************************************//

//    cua hiep nhe
     List<FriendListCheck>getAccountFriendList(Long idAccount);
    FriendListCheck checkFriend(Long idAccount, Long idTarget);
}
