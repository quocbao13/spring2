package com.c09.dating.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name = "account",uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Getter
@Setter
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, columnDefinition = "INT")
    private Long id;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "is_policy")
    private Boolean isPolicy;
    @Column(name = "is_enable")
    private Boolean isEnable;
    @OneToOne(mappedBy = "accounts")
    private User users;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonBackReference(value = "account_ban")
    private Set<Ban> banSet;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public User getUsers() {
        return users;
    }
    public void setUsers(User users) {
        this.users = users;
    }
    public Set<Role> getRoles() {
        return roles;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    public Boolean getPolicy() {
        return isPolicy;
    }
    public void setPolicy(Boolean policy) {
        isPolicy = policy;
    }
    public Boolean getEnable() {
        return isEnable;
    }
    public void setEnable(Boolean enable) {
        isEnable = enable;
    }
    public Set<Ban> getBanSet() {
        return banSet;
    }
    public void setBanSet(Set<Ban> banSet) {
        this.banSet = banSet;
    }
}
