import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {};

const PrivacyView = (props: Props) => {
  return (
    <Box padding={"30px 10%"}>
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}>
        <Typography fontSize={"1.2rem"} fontWeight={"500"} color='active.main'>
          Text To Speech OpenAI
        </Typography>
        <Typography variant='h1' fontSize={{ xs: "2rem", md: "3rem" }}>
          Chính sách Bảo mật
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.3rem" }}>
          hính sách quyền riêng tư này được thiết kế để giúp bạn hiểu rõ thông
          tin chúng tôi thu thập, lý do thu thập và cách bạn có thể cập nhật,
          quản lý, xuất khẩu và xóa thông tin của mình.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"100px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          1.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Chính sách bảo mật cho ứng dụng Text To Speech của OpenAI:</b>Tại
          Text To Speech OpenAI, chúng tôi ưu tiên bảo vệ quyền riêng tư của bạn
          và đảm bảo an toàn thông tin cá nhân của bạn. Chính sách bảo mật này
          mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin mà bạn cung
          cấp khi sử dụng dịch vụ tạo lời nói của chúng tôi. Bằng cách truy cập
          và sử dụng trang web của chúng tôi (ai.gmv.vn), bạn đồng ý với các
          hành động mà chúng tôi mô tả trong chính sách này.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          2.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Thu thập thông tin: </b>Khi bạn tạo một tài khoản trên trang web
          của chúng tôi, chúng tôi thu thập một số thông tin cá nhân như địa chỉ
          email và tên đầy đủ của bạn. Thông tin này cần thiết để cấp quyền truy
          cập vào dịch vụ của chúng tôi, cung cấp cập nhật hoặc thay đổi cho
          dịch vụ của chúng tôi và cho việc phân tích thống kê để cải thiện các
          dịch vụ của chúng tôi. Ngoài ra, bất kỳ văn bản hoặc tài liệu nào được
          tải lên để tạo ngôn ngữ nói sẽ được lưu trữ tạm thời chỉ với mục đích
          tạo ra đầu ra ngôn ngữ nói.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          3.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Tính toán Tín dụng: </b>Để đảm bảo việc lập hóa đơn chính xác, số
          lượng tín chỉ cần thiết cho việc tạo ra văn bản nói được tính dựa trên
          văn bản hoặc tài liệu cung cấp. Phép tính này được thực hiện bằng cách
          sử dụng thuật toán độc quyền của chúng tôi và tỉ lệ thuận trực tiếp
          với độ phức tạp và độ dài của đầu vào.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          4.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Thanh toán & Bảo mật: </b>Đối với xử lý thanh toán, chúng tôi cung
          cấp các lựa chọn PayPal và thẻ tín dụng. Chúng tôi không lưu trữ thông
          tin thẻ tín dụng trên máy chủ của mình. Tất cả giao dịch thanh toán
          được xử lý một cách an toàn bởi các nhà cung cấp dịch vụ thanh toán
          bên thứ ba đáng tin cậy tuân thủ theo chính sách bảo mật và riêng tư
          của họ.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          5.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Thông báo qua email và truy cập vào đầu ra bằng lời nói: </b> Sau
          khi hoàn thành việc tạo bài phát biểu, bạn sẽ nhận được một email
          thông báo chứa một liên kết an toàn để truy cập và tải xuống bài phát
          biểu được tạo ra. Liên kết này vẫn hoạt động trong một khoảng thời
          gian nhất định để tiện lợi cho bạn.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          6.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Bảo mật dữ liệu: </b>Chúng tôi triển khai các biện pháp bảo mật
          theo chuẩn ngành để bảo vệ thông tin cá nhân và tài liệu được tải lên
          khỏi truy cập, tiết lộ hoặc thay đổi không được ủy quyền. Mặc dù chúng
          tôi cố gắng duy trì mức độ bảo mật cao nhất, nhưng hãy lưu ý rằng
          không có phương pháp truyền thông qua internet hoặc lưu trữ điện tử
          nào là hoàn toàn an toàn.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          7.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Dịch vụ của bên thứ ba: </b>Chúng tôi có thể sử dụng các dịch vụ
          của bên thứ ba, như các nhà cung cấp phân tích, để nâng cao dịch vụ
          của chúng tôi và phân tích mẫu sử dụng. Các dịch vụ này có thể thu
          thập thông tin về việc sử dụng của bạn nhưng không truy cập vào thông
          tin cá nhân của bạn.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          8.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Cookies và Công nghệ theo dõi: </b>Trang web của chúng tôi sử dụng
          cookies và các công nghệ theo dõi tương tự để cải thiện trải nghiệm
          người dùng và phân tích việc sử dụng trang web. Bạn có thể tắt cookies
          thông qua cài đặt trình duyệt của mình, nhưng hãy lưu ý rằng một số
          tính năng của trang web của chúng tôi có thể không hoạt động đúng
          cách.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          9.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Liên kết bên thứ ba:</b>Trang web của chúng tôi có thể chứa liên
          kết đến trang web của bên thứ ba. Chúng tôi không chịu trách nhiệm về
          các nguyên tắc bảo mật hoặc nội dung của những trang web này và khuyến
          khích bạn xem xét chính sách bảo mật tương ứng của họ.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          10.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Quyền riêng tư của trẻ em:</b>Chúng tôi không phục vụ cho người
          dưới 18 tuổi và chúng tôi không thu thập hoặc lưu trữ thông tin cá
          nhân của bất kỳ ai dưới độ tuổi này. Nếu chúng tôi nhận thức được việc
          thu thập thông tin cá nhân không cố ý từ một đứa trẻ dưới 18 tuổi,
          chúng tôi sẽ thực hiện các biện pháp để loại bỏ thông tin đó khỏi hồ
          sơ của chúng tôi.
        </Typography>
      </Box>
      <Box display={"flex"} pb={"50px"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          11.
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.2rem" }}>
          <b>Cập nhật Chính sách Bảo mật của chúng tôi: </b>Chúng tôi có thể
          định kỳ cập nhật Chính sách Bảo mật của mình để phản ánh các thay đổi
          trong thực hành hoặc yêu cầu pháp lý. Bất kỳ sửa đổi nào sẽ có hiệu
          lực ngay lập tức sau khi đăng Chính sách cập nhật trên trang web của
          chúng tôi. Chúng tôi khuyến khích bạn đánh giá Chính sách Bảo mật này
          định kỳ để có thông tin mới nhất.
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyView;
