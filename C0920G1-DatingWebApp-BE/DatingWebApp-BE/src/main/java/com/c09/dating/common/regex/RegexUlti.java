package com.c09.dating.common.regex;

public class RegexUlti {

/*  _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
    Hieu làm regex phần này
    Effective:
        - REGEX_FULLNAME là regex tên người, cho phép nhập tiếng việt, viết hoa, viết thường, dấu cách, từ 1-45 ký tự
        - REGEX_GENDER là regex giới tính, cho phép 4 chữ là Male, Female, Nam, Nữ
        - REGEX_DESCRIPTION là cho phép nhập tiếng việt, viết hoa, viết thường, dấu cách, số từ 0-9, dấu chấm, hỏi, chấm than, dấu phẩy
        - REGEX_PHONE là sdt có 10 số, bắt đầu với các con số như sau 090, 093, 079, 078, 077, 076
        - REGEX_MARRIED là chỉ có 2 giá trị là (Độc thân) và (Đã kết hôn)
*/

    public static final String REGEX_FULLNAME = "^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"'<>,.?\\/]{4,50}$";
    public static final String REGEX_DESCRIPTION = "^[^\\t\\-|\\\\{}\\[\\]\"\\/]{0,254}$";
    public static final String REGEX_GENDER = "^(Nam|Nữ|Khác)$";
    public static final String REGEX_PHONE = "^0\\d{9}$";
    public static final String REGEX_MARRIED = "^(Độc thân|Đã kết hôn|Khác)$";
//    public static final String REGEX_DESCRIPTION = "^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"'<>,.?\\/]{0,1000}$";

//_-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_


}
