package com.c09.dating.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ban")
@Getter
@Setter
@NoArgsConstructor
public class Ban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @Column(name = "date_un_ban")
    private LocalDate dateUnban;

    @Column(name = "status_lock")
    private Boolean statusLock;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateUnban() {
        return dateUnban;
    }

    public void setDateUnban(LocalDate dateUnban) {
        this.dateUnban = dateUnban;
    }

    public Boolean getStatusLock() {
        return statusLock;
    }

    public void setStatusLock(Boolean statusLock) {
        this.statusLock = statusLock;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
