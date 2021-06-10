package com.c09.dating.service.impl;

import com.c09.dating.DTO.ListUserRecommendSystemDTO;
import com.c09.dating.DTO.ListUserRecommendToShowDTO;
import com.c09.dating.DTO.MutualFriendDTO;
import com.c09.dating.entity.DisLikeRecommend;
import com.c09.dating.entity.Hobby;
import com.c09.dating.entity.User;
import com.c09.dating.entity.UserHobby;
import com.c09.dating.repository.DatingRepository;
import com.c09.dating.repository.DisLikeRecommendRepository;
import com.c09.dating.repository.RelationshipRepository;
import com.c09.dating.service.DatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
public class DatingServiceImpl implements DatingService {

    @Autowired
    private DatingRepository datingRepository;

    @Autowired
    private DisLikeRecommendRepository disLikeRecommendRepository;

    @Autowired
    private RelationshipRepository relationshipRepository;

    @Override
    public List<ListUserRecommendSystemDTO> getAllUserByGenderAndProvince(String gender, String idProvince, Long idUserLogin) {
        List<User> users = datingRepository.getAllUserByGenderAndProvince(gender, idProvince);
        if (users == null) {
            return null;
        }
        List<DisLikeRecommend> disLikeRecommends = disLikeRecommendRepository.findAllByIdUser(idUserLogin);
        List<MutualFriendDTO> mutualFriendDTOS = relationshipRepository.getAllRelationshipForRecommend(idUserLogin);
        List<User> dislikeUserList = new ArrayList<>();
        List<Long> idFriend = new ArrayList<>();
        for (MutualFriendDTO m : mutualFriendDTOS) {
            idFriend.add(m.getFriendID());
        }
        List<User> userFriendList = datingRepository.findAllById(idFriend);
        users.removeAll(userFriendList);
        for (DisLikeRecommend disLikeRecommend : disLikeRecommends) {
            dislikeUserList.add(disLikeRecommend.getUser());
        }
        users.removeAll(dislikeUserList);
        List<ListUserRecommendSystemDTO> listUserRecommendSystemDTOS = new ArrayList<>();
        for (User u : users) {
            if (listUserRecommendSystemDTOS.size() != 0) {
                if (listUserRecommendSystemDTOS.get(listUserRecommendSystemDTOS.size() - 1).getUserId().equals(u.getId())) {
                    continue;
                }
            }
            String[] arrDate = u.getDayOfBirth().toString().split("-");
            List<Integer> date = new ArrayList<>();
            for (String s : arrDate) {
                date.add(Integer.parseInt(s));
            }
            LocalDate today = LocalDate.now();
            LocalDate birthday = LocalDate.of(date.get(0), date.get(1), date.get(2));
            Period p = Period.between(birthday, today);
            for (UserHobby userHobby : u.getUserHobbySet()) {
                ListUserRecommendSystemDTO listUserRecommendSystemDTO = new ListUserRecommendSystemDTO();
                listUserRecommendSystemDTO.setUserId(u.getId());
                listUserRecommendSystemDTO.setName(u.getFullName());
                listUserRecommendSystemDTO.setBirthDay(p.getYears());
                listUserRecommendSystemDTO.setGender(u.getGender());
                listUserRecommendSystemDTO.setDatingGender(u.getDatingGender());
                listUserRecommendSystemDTO.setProvince(u.getDistrict().getProvince().getName());
                listUserRecommendSystemDTO.setDescription(u.getDescriptionUser());
                listUserRecommendSystemDTO.setHobby(userHobby.getHobby().getName());
                listUserRecommendSystemDTOS.add(listUserRecommendSystemDTO);
            }

        }
        return listUserRecommendSystemDTOS;
    }

    @Override
    public ListUserRecommendSystemDTO getUserById(Long id) {
        User user = datingRepository.getUserById(id);
        String[] arrDate = user.getDayOfBirth().toString().split("-");
        List<Integer> date = new ArrayList<>();
        for (String s : arrDate) {
            date.add(Integer.parseInt(s));
        }
        LocalDate today = LocalDate.now();
        LocalDate birthday = LocalDate.of(date.get(0), date.get(1), date.get(2));
        Period p = Period.between(birthday, today);
        ListUserRecommendSystemDTO listUserRecommendSystemDTO = new ListUserRecommendSystemDTO();
        listUserRecommendSystemDTO.setUserId(user.getId());
        listUserRecommendSystemDTO.setName(user.getFullName());
        listUserRecommendSystemDTO.setBirthDay(p.getYears());
        listUserRecommendSystemDTO.setGender(user.getGender());
        listUserRecommendSystemDTO.setDatingGender(user.getDatingGender());
        listUserRecommendSystemDTO.setProvince(user.getDistrict().getProvince().getName());
        listUserRecommendSystemDTO.setDescription(user.getDescriptionUser());
        return listUserRecommendSystemDTO;
    }

    @Override
    public List<Hobby> getHobbyOfUserById(Long id) {
        User user = datingRepository.getUserById(id);
        List<Hobby> hobbies = new ArrayList<>();
        for (UserHobby userHobby : user.getUserHobbySet()) {
            Hobby hobby = userHobby.getHobby();
            hobbies.add(hobby);
        }
        return hobbies;
    }

    @Override
    public List<ListUserRecommendSystemDTO> getAllUserByGender(String datingGender, Long idUserLogin) {
        List<User> users = datingRepository.getAllUserByGender(datingGender);
        List<ListUserRecommendSystemDTO> listUserRecommendSystemDTOS = new ArrayList<>();
        if (users == null) {
            return null;
        }
        List<DisLikeRecommend> disLikeRecommends = disLikeRecommendRepository.findAllByIdUser(idUserLogin);
        List<MutualFriendDTO> mutualFriendDTOS = relationshipRepository.getAllRelationshipForRecommend(idUserLogin);
        List<Long> idFriend = new ArrayList<>();
        for (MutualFriendDTO m : mutualFriendDTOS) {
            idFriend.add(m.getFriendID());
        }
        List<User> userFriendList = datingRepository.findAllById(idFriend);
        users.removeAll(userFriendList);
        List<User> dislikeUserList = new ArrayList<>();
        for (DisLikeRecommend disLikeRecommend : disLikeRecommends) {
            dislikeUserList.add(disLikeRecommend.getUser());
        }
        users.removeAll(dislikeUserList);
        for (User u : users) {
            if (listUserRecommendSystemDTOS.size() != 0) {
                if (listUserRecommendSystemDTOS.get(listUserRecommendSystemDTOS.size() - 1).getUserId().equals(u.getId())) {
                    continue;
                }
            }
            String[] arrDate = u.getDayOfBirth().toString().split("-");
            List<Integer> date = new ArrayList<>();
            for (String s : arrDate) {
                date.add(Integer.parseInt(s));
            }
            LocalDate today = LocalDate.now();
            LocalDate birthday = LocalDate.of(date.get(0), date.get(1), date.get(2));
            Period p = Period.between(birthday, today);
            for (UserHobby userHobby : u.getUserHobbySet()) {
                ListUserRecommendSystemDTO listUserRecommendSystemDTO = new ListUserRecommendSystemDTO();
                listUserRecommendSystemDTO.setUserId(u.getId());
                listUserRecommendSystemDTO.setName(u.getFullName());
                listUserRecommendSystemDTO.setBirthDay(p.getYears());
                listUserRecommendSystemDTO.setGender(u.getGender());
                listUserRecommendSystemDTO.setDatingGender(u.getDatingGender());
                listUserRecommendSystemDTO.setProvince(u.getDistrict().getProvince().getName());
                listUserRecommendSystemDTO.setDescription(u.getDescriptionUser());
                listUserRecommendSystemDTO.setHobby(userHobby.getHobby().getName());
                listUserRecommendSystemDTOS.add(listUserRecommendSystemDTO);
            }

        }
        return listUserRecommendSystemDTOS;
    }

    @Override
    public List<ListUserRecommendToShowDTO> showListUserRecommend(Long id) {
        final String uri = "http://127.0.0.1:5000/todos/" + id;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ListUserRecommendSystemDTO>> responseEntity = restTemplate.exchange(uri,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<ListUserRecommendSystemDTO>>() {
                });
        List<ListUserRecommendSystemDTO> listUserRecommendSystemDTOS = responseEntity.getBody();
        List<Long> idUserRecommend = new ArrayList<>();
        assert listUserRecommendSystemDTOS != null;
        idUserRecommend.add(listUserRecommendSystemDTOS.get(0).getUserId());
        for (int i = 1; i < listUserRecommendSystemDTOS.size(); i++) {
            boolean check = true;
            for (Long aLong : idUserRecommend) {
                if (listUserRecommendSystemDTOS.get(i).getUserId().equals(aLong)) {
                    check = false;
                    break;
                }
            }
            if (check) {
                idUserRecommend.add(listUserRecommendSystemDTOS.get(i).getUserId());
            }
            if (idUserRecommend.size() >= 5) {
                break;
            }
        }

        List<User> users = datingRepository.findAllById(idUserRecommend);
        List<ListUserRecommendToShowDTO> listUserRecommendToShowDTOS = new ArrayList<>();
        for (User u : users) {
            String[] arrDate = u.getDayOfBirth().toString().split("-");
            List<Integer> date = new ArrayList<>();
            for (String s : arrDate) {
                date.add(Integer.parseInt(s));
            }
            LocalDate today = LocalDate.now();
            LocalDate birthday = LocalDate.of(date.get(0), date.get(1), date.get(2));
            Period p = Period.between(birthday, today);
            ListUserRecommendToShowDTO listUserRecommendToShowDTO = new ListUserRecommendToShowDTO();
            listUserRecommendToShowDTO.setUserId(u.getId());
            listUserRecommendToShowDTO.setName(u.getFullName());
            listUserRecommendToShowDTO.setBirthDay(p.getYears());
            listUserRecommendToShowDTO.setGender(u.getGender());
            listUserRecommendToShowDTO.setImg(u.getAvatar());
            listUserRecommendToShowDTO.setProvince(u.getDistrict().getProvince().getName());
            listUserRecommendToShowDTO.setDescription(u.getDescriptionUser());
            List<Hobby> hobbies = new ArrayList<>();
            for (UserHobby userHobby : u.getUserHobbySet()) {
                hobbies.add(userHobby.getHobby());
            }
            listUserRecommendToShowDTO.setHobbies(hobbies);
            listUserRecommendToShowDTOS.add(listUserRecommendToShowDTO);
        }
        return listUserRecommendToShowDTOS;
    }

    @Override
    public DisLikeRecommend saveDislikeUser(Long idLogin, Long idDislike) {
        User user = datingRepository.getUserById(idLogin);
        DisLikeRecommend disLikeRecommend = new DisLikeRecommend();
        disLikeRecommend.setIdDislike(idDislike);
        disLikeRecommend.setUser(user);
        return disLikeRecommendRepository.save(disLikeRecommend);
    }

}
