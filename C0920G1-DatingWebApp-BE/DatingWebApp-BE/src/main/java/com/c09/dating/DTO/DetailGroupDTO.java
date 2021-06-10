package com.c09.dating.DTO;

import com.c09.dating.entity.Group;

public class DetailGroupDTO {
    private AdminGroupDTO adminGroupDTO;
    private Group group;

    public DetailGroupDTO(AdminGroupDTO adminGroupDTO, Group group) {
        this.adminGroupDTO = adminGroupDTO;
        this.group = group;
    }

    public AdminGroupDTO getAdminGroupDTO() {
        return adminGroupDTO;
    }

    public void setAdminGroupDTO(AdminGroupDTO adminGroupDTO) {
        this.adminGroupDTO = adminGroupDTO;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
