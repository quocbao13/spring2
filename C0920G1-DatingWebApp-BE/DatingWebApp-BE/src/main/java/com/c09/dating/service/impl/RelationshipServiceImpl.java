package com.c09.dating.service.impl;



import com.c09.dating.DTO.*;


import com.c09.dating.DTO.FriendListCheck;

import com.c09.dating.entity.User;
import com.c09.dating.repository.RelationshipRepository;
import com.c09.dating.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelationshipServiceImpl implements RelationshipService {
    @Autowired
    private RelationshipRepository relationshipRepository;

    /***********************Duong Nguyen Bao***********************/
    @Override
    public List<MutualFriendDTO> getFriendRequestList(Long userId, Long loaded) {
        return relationshipRepository.getFriendRequestList(userId, loaded);
    }

    @Override
    public void addFriend(Long userId, Long friendId) {
        relationshipRepository.addFriend(userId, friendId);
        relationshipRepository.addFriend2(userId, friendId);
    }

    @Override
    public void confirmFriend(Long userId, Long friendId) {
        relationshipRepository.confirmFriend(userId, friendId);
    }

    @Override
    public void deleteFriendRequest(Long userId, Long friendId) {
        relationshipRepository.deleteFriendRequest(userId, friendId);
    }

    @Override
    public Long getStatusId(Long userId, Long friendId) {
        return relationshipRepository.getStatusId(userId, friendId);
    }

    @Override
    public Long countFriendRequest(Long id) {
        return relationshipRepository.countFriendRequest(id);
    }

    @Override
    public List<Long> existFriendRequest(Long id) {
        return relationshipRepository.existFriendRequest(id);
    }

    //Lấy user để test
    @Override
    public User getUser(Long id) {
        return relationshipRepository.getUser(id);
    }

    /***********************The End***********************/

    //***************************Hưng viết chức năng gợi ý kết bạn và danh sách bạn bè xóa bạn bè***//
    @Override
    public List<MutualFriendDTO> getAllMadeFriends(Long id , Integer page) {
        return this.relationshipRepository.getAllRelationship(id , page);
    }

    @Override
    public ListFriend getFriendById(Integer id) {
        return this.relationshipRepository.getById(id);
    }


    @Override
    public MutualFriendDTO getFriendByIdAccount(Long id) {
        return this.relationshipRepository.getByIdAcount(id);
    }

    @Override
    public void delNewFriend(Long UserID, Long FriendID) {
        this.relationshipRepository.delNewFriend(UserID,FriendID);
    }

    @Override
    public void delNewFriend2(Long UserID, Long FriendID) {
        this.relationshipRepository.delNewFriend2(UserID,FriendID);
    }

    @Override
    public List<MutualFriendDTO> getFriendSuggestion(Long id) {
        return this.relationshipRepository.getAllFriend(id);
    }
    @Override
    public void blockFriend(Long UserID, Long FriendID) {
        this.relationshipRepository.blockFriend(UserID, FriendID);
    }

    @Override
    public void blockFriend1(Long UserID, Long FriendID) {
        this.relationshipRepository.blockFriend1(UserID, FriendID);
    }


    @Override
    public List<FriendListCheck> getAccountFriendList(Long idAccount) {
        return this.relationshipRepository.getAccountFriendList(idAccount);}

    @Override
    public FriendListCheck checkFriend(Long idAccount, Long idTarget) {
        return this.relationshipRepository.checkFriend(idAccount, idTarget);
    }


//
//    @Override
//   public List<MutualFriendDTO> serachByName(String fullName) {
//        return relationshipRepository.serachByName(fullName);
//
//    }


//    *****************************8686****Hết****************************************

}
