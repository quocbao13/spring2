package com.c09.dating.config;
import com.c09.dating.security.jwt.JwtEntryPoint;
import com.c09.dating.security.jwt.JwtTokenFilter;
import com.c09.dating.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    JwtEntryPoint jwtEntryPoint;
    @Bean
    JwtTokenFilter jwtTokenFilter() {
        return new JwtTokenFilter();
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/oauth/**","/auth/signin","/auth/signup", "/auth/confirm-account","/oauth/facebook", "/api/group/*/out/*", "/api/group/*/join/*"
                       ).permitAll()
                .antMatchers("/oauth/**", "/auth/signin", "/auth/signup",
                        "/auth/confirm-account", "/oauth/facebook",
                        "/dating/list/*", "/dating/*", "/dating/user/*"
                ).permitAll()
                .antMatchers("/api/member-management",
                        "/api/member-management/list-member/*",
                        "/api/member-management/list-member-find/*",
                        "/api/member-management/reports/*",
                        "/api/member-management/member/*",
                        "/api/member-management/ban-1-week/*",
                        "/api/member-management/ban-1-month/*",
                        "/api/member-management/ban-forever/*",
                        "/api/member-management/warning/*"
                        ).hasRole("ADMIN")
                .antMatchers("/api/group/*", "/api/group/*/member", "/api/group/*/member/*", "/api/group/list", "/api/group/delete/*",
                        "/api/profile/list-post","/api/profile/list-post/*",
                        "/api/profile/*", "/api/profile/*/img", "/api/profile/*/edit-info", "api/profile/district", "api/profile/get-account",
                        "api/profile/province", "/api/profile/*/edit-avatar",
                        "/api/profile/*/edit-password", "/api/profile/*/set-status", "/api/profile/*/friend",
                        "/api/profile/*/new-info", "/api/posts/list", "/api/comment/create", "/api/comment/edit/*", "/api/like/create",
                        "/api/post/create", "/api/post/edit/*", "/api/member-management/list", "/api/member-management/lock",
                        "/api/member-management/reports", "/api/member-management/delete/*", "/dating/show-recommend/*"
                ).hasRole("CUSTOMER")
                .antMatchers("/api/group/*",
                        "/api/group/*/member",
                        "/api/group/*/post",
                        "/api/group/list",
                        "/api/group/delete/*",
                        "/api/profile/list-post",
                        "/api/profile/list-post/*",
                        "/api/profile/*",
                        "/api/profile/comment/*",
                        "/api/profile/*/img",
                        "/api/profile/*/edit-info",
                        "api/profile/district",
                        "api/profile/get-account",
                        "api/profile/province",
                        "/api/profile/*/edit-avatar",
                        "/api/profile/*/edit-password",
                        "/api/profile/*/set-status",
                        "/api/profile/*/friend",
                        "/api/profile/*/new-info",
                        "/api/posts/list",
                        "/api/posts/list1",
                        "/api/comment/create",
                        "/api/comment/edit/*",
                        "/api/like/create",
                        "/api/post/create",
                        "/api/post/edit/*",
                        "/api/member-management/list",
                        "/api/member-management/lock",
                        "/api/member-management/reports",
                        "/api/member-management/delete/*",
                        "/dating/show-recommend/*",
                        "/api/like/delete/*",
                        "/dating/show-recommend/*"

                ).hasRole("CUSTOMER")
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}