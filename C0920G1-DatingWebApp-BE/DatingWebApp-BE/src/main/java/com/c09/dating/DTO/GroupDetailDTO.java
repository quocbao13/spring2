package com.c09.dating.DTO;

public class GroupDetailDTO {
    private Long idUesr;
    private Long idGroup;

    public GroupDetailDTO(Long idUesr, Long idGroup) {
        this.idUesr = idUesr;
        this.idGroup = idGroup;
    }

    public Long getIdUesr() {
        return idUesr;
    }

    public void setIdUesr(Long idUesr) {
        this.idUesr = idUesr;
    }

    public Long getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(Long idGroup) {
        this.idGroup = idGroup;
    }
}
