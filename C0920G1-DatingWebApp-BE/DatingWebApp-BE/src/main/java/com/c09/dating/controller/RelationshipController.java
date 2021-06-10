package com.c09.dating.controller;

import com.c09.dating.DTO.ListFriend;
import com.c09.dating.DTO.MutualFriendDTO;
import com.c09.dating.DTO.NotificationDTO;
import com.c09.dating.DTO.NotificationDTOInterface;
import com.c09.dating.entity.User;
import com.c09.dating.service.NotificationService;
import com.c09.dating.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:4200")
public class RelationshipController {
    LocalDate localDate = LocalDate.now();
    NotificationDTO notificationDTO = new NotificationDTO();
    @Autowired
    private RelationshipService relationshipService;
    @Autowired
    private NotificationService notificationService;
    /***********************Duong Nguyen Bao***********************/
    //Lấy user để test
    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        User user = relationshipService.getUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    /**
     * Send friend request
     * created by BaoDN
     */
    @GetMapping(value = "/{userId}/add-friend/{friendId}")
    public ResponseEntity<?> addFriend(@PathVariable("userId") Long userId,
                                       @PathVariable("friendId") Long friendId) {
        try {
            relationshipService.addFriend(userId, friendId);
            User user = relationshipService.getUser(userId);
            notificationDTO.setContent(user.getFullName() + " muốn làm quen với bạn!");
            notificationDTO.setTime(localDate);
            notificationDTO.setUserId(friendId);
            notificationService.createFriendNotification(notificationDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    /**
     * View list of friend request
     * created by BaoDN
     */
    @GetMapping(value = "/{id}/friend-request-list")
    public ResponseEntity<?> showFriendRequestList(@PathVariable("id") Long id, @RequestParam Long loaded) {
        List<MutualFriendDTO> friendRequests = relationshipService.getFriendRequestList(id, loaded);
        if (friendRequests == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(friendRequests, HttpStatus.OK);
        }
    }
    /**
     * Count amount of friend request
     * created by BaoDN
     */
    @GetMapping(value = "/{id}/amount-friend-request")
    public ResponseEntity<Long> countFriendRequest(@PathVariable("id") Long id) {
        try {
            Long amount = relationshipService.countFriendRequest(id);
            return new ResponseEntity<>(amount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    /**
     * Confirm friend request
     * created by BaoDN
     */
    @GetMapping(value = "/{userId}/confirm-friend/{friendId}")
    public ResponseEntity<?> confirmFriend(@PathVariable("userId") Long userId,
                                           @PathVariable("friendId") Long friendId) {

        try {
            relationshipService.confirmFriend(userId, friendId);
            User user = relationshipService.getUser(userId);
            notificationDTO.setContent(user.getFullName() + " đã đồng ý kết bạn!");
            notificationDTO.setTime(localDate);
            notificationDTO.setUserId(friendId);
            notificationService.createFriendNotification(notificationDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }
    }
    /**
     * Delete friend request
     * created by BaoDN
     */
    @GetMapping(value = "/{userId}/delete-friend-request/{friendId}")
    public ResponseEntity<?> deleteFriendRequest(@PathVariable("userId") Long userId,
                                                 @PathVariable("friendId") Long friendId) {
        List<Long> existFriendRequest = relationshipService.existFriendRequest(userId);
        String canceledRequest = "Lời mời đã bị thu hồi";
        boolean check = false;
        for (Long id : existFriendRequest) {
            if(id.equals(friendId)) {
                check = true;
                break;
            }
        }
        if(check) {
            relationshipService.deleteFriendRequest(userId, friendId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(canceledRequest, HttpStatus.NOT_FOUND);
        }
    }
    /**
     * Check status
     * created by BaoDN
     */
    @GetMapping(value = "/{userId}/relationship-status/{friendId}")
    public ResponseEntity<Long> getStatusId(@PathVariable("userId") Long userId,
                                            @PathVariable("friendId") Long friendId) {
        try {
            Long statusId = relationshipService.getStatusId(userId, friendId);
            return new ResponseEntity<>(statusId, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/{id}/friend-request-notification")
    public ResponseEntity<?> showFriendRequestNotification(@PathVariable("id") Long id) {
        try {
            List<NotificationDTOInterface> notificationDTOList = notificationService.showFriendRequestNotification(id);
            return new ResponseEntity<>(notificationDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    /***********************The End***********************/
    //***************************Cấm sửa khi chưa hỏi ý của người viết code nhé******************//
    //***************************Hưng viết chức năng gợi ý kết bạn và danh sách bạn bè xóa bạn bè***//
    @GetMapping("/getMutual")
    public ResponseEntity<List<MutualFriendDTO>> getByIdTest(@RequestParam Long id ,@RequestParam Integer page) {
        try {
            List<MutualFriendDTO> mutualFriendDTO = this.relationshipService.getAllMadeFriends(id , page);
            return new ResponseEntity<>(mutualFriendDTO, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/profile/{id}/friend")
    public ResponseEntity<ListFriend> getFriendById(@PathVariable Integer id) {
        ListFriend account = this.relationshipService.getFriendById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @GetMapping("/del-friend-request")
    public ResponseEntity<MutualFriendDTO> delNewFriend(@RequestParam Long UserID,
                                                        @RequestParam Long FriendID) {
        try {
            MutualFriendDTO accounts = relationshipService.getFriendByIdAccount(UserID);
            if (accounts == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            this.relationshipService.delNewFriend(UserID,FriendID);
            this.relationshipService.delNewFriend2(UserID,FriendID);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/block-friend")
    public ResponseEntity<MutualFriendDTO> blockFriend(@RequestParam Long UserID,
                                                        @RequestParam Long FriendID) {
        try {
            MutualFriendDTO accounts = relationshipService.getFriendByIdAccount(UserID);
            if (accounts == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            this.relationshipService.blockFriend(UserID,FriendID);
            this.relationshipService.blockFriend1(UserID,FriendID);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/getAccountInformation/{id}", method = RequestMethod.GET)
    public ResponseEntity<MutualFriendDTO> getAccountInformation(@PathVariable Long id) {
        try {
            MutualFriendDTO accountDTO = this.relationshipService.getFriendByIdAccount(id);
            return new ResponseEntity<>(accountDTO, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/general-friend/{id}" , method = RequestMethod.GET)
    public ResponseEntity<List<MutualFriendDTO>> getFriendSuggestion(@PathVariable Long id){
        try {
            List<MutualFriendDTO> mutualFriendDTO = this.relationshipService.getFriendSuggestion(id);
            System.out.println(mutualFriendDTO);
            if (mutualFriendDTO.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(mutualFriendDTO, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    *************** Hết *********************************************************//
}
