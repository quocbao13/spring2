# C0920G1-DatingWebApp-BE
Ứng dụng hẹn hò phần back-end
.structure project: (mọi người đọc kỹ để build đúng theo structure, tránh trường hợp conflict và class/interface/... nằm sai thư mục. Thân!)
  ../main/java/com.c09.dating
        /configs -> chứa các file dùng để config.
        /database -> chứa database mySQL.
        /entities -> chứa các entity mapping với table database.
        /DTO -> chứa các model DTO.
        /controllers -> chứa các file controller điều hướng.
        /services -> chứa các file service xử lý nghiệp vụ.
        /repositories -> chứa các file repo thao tác query với database.
        /ultilities -> chứa file tiện ích, thư viện tự code,...
            /regex -> chứa file check regex (format chuẩn dùng boolean fuction trả về true/false).
            /anotation-validator -> chứa các anotation dùng để validator phía back-end và database.
  Phát sinh thêm thư mục nào cần add thì mọi người liên hệ Nhân để add thêm. (Mọi sai phạm sẽ không đc push để hạn chế tối đa conflict và gây lộn xộn cấu trúc dự án)
    
