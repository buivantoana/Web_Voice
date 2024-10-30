import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {};

const TermsView = (props: Props) => {
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
        <Typography variant='h1'>Điều khoản Dịch vụ</Typography>
        <Typography color='grey_500.main' fontSize={"1.3rem"}>
          Sản phẩm Điều khoản dịch vụ này được thiết kế để giúp bạn hiểu thông
          tin chúng tôi thu thập, lý do chúng tôi thu thập nó, và cách bạn có
          thể cập nhật, quản lý, xuất khẩu, và xóa thông tin của bạn.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"100px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Chấp nhận các Điều khoản:</b>Bằng cách sử dụng Dịch vụ Tạo lời nói,
          bạn đồng ý tuân thủ các Điều khoản Dịch vụ này. Nếu bạn không đồng ý
          với bất kỳ phần nào của những điều khoản này, vui lòng không sử dụng
          dịch vụ của chúng tôi.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Tài khoản người dùng: </b>Truy cập các tính năng cụ thể của dịch vụ
          của chúng tôi có thể đòi hỏi việc tạo tài khoản người dùng. Bạn cam
          kết duy trì tính bí mật của thông tin đăng nhập tài khoản của mình và
          chấp nhận hoàn toàn trách nhiệm đơn lẻ cho tất cả các hoạt động được
          thực hiện dưới tài khoản của bạn.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Thanh toán và Tín dụng: </b>Dịch vụ tạo giọng nói của chúng tôi
          hoạt động trên hệ thống dựa trên tín chỉ. Số tín chỉ cần thiết để tạo
          giọng nói được xác định bằng thuật toán độc quyền của chúng tôi và
          được tính toán chính xác dựa trên văn bản hoặc tài liệu đầu vào. Khi
          số dư tín dụng cạn kiệt, bạn phải nạp tiền vào tài khoản của mình.
          Thanh toán có thể được thực hiện thông qua PayPal hoặc thẻ tín dụng.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Dịch vụ Sử dụng: </b>Bạn cam kết sử dụng dịch vụ của chúng tôi chỉ
          cho mục đích hợp pháp. Bạn sẽ không tải lên, truyền tải hoặc lưu trữ
          bất kỳ nội dung nào vi phạm pháp luật, gây hại, phỉ báng hoặc xâm phạm
          quyền của người khác. Bạn hoàn toàn chịu trách nhiệm về bất kỳ nội
          dung nào gửi để tạo ra bài phát biểu.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Tài sản trí tuệ: </b> Tất cả nội dung và tài liệu có thể truy cập
          thông qua dịch vụ của chúng tôi, bao gồm văn bản, đồ họa, logo và phần
          mềm, là tài sản của ttsopenai.com và được bảo vệ bởi luật sở hữu trí
          tuệ. Việc sao chép, sửa đổi, phân phối hoặc tạo ra các tác phẩm phái
          sinh từ nội dung mà không có sự đồng ý bằng văn bản trước đó là bị
          cấm.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Hạn chế Trách nhiệm: </b>ttsopenai.com sẽ không chịu trách nhiệm về
          bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu
          quả nào phát sinh từ việc sử dụng dịch vụ của chúng tôi. Chúng tôi
          không bảo đảm về tính chính xác, đầy đủ hoặc sẵn có của dịch vụ và bác
          bỏ tất cả các bảo hành, có hay ngụ ý, liên quan đến việc sử dụng hoặc
          kết quả của chúng.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Chấm dứt: </b>Chúng tôi giữ quyền tạm ngừng hoặc chấm dứt tài khoản
          và quyền truy cập vào dịch vụ của chúng tôi theo quyết định của chúng
          tôi, có hoặc không có lý do. Khi chấm dứt, tài khoản của bạn và dữ
          liệu liên quan sẽ bị xóa, ngoại trừ thông tin phải giữ lại cho mục
          đích pháp lý hoặc kế toán.
        </Typography>
      </Box>
      <Box display={"flex"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Luật pháp quản lý: </b> Các Điều khoản Dịch vụ này sẽ được diễn
          giải và điều chỉnh theo luật pháp của Việt Nam, không phụ thuộc vào
          nguyên tắc xung đột pháp luật của nó. Mọi tranh chấp phát sinh từ hoặc
          liên quan đến các Điều khoản này và việc sử dụng dịch vụ của chúng tôi
          sẽ phải tuân thủ theo quyền lực độc quyền của tòa án tại Việt Nam.
        </Typography>
      </Box>

      <Box display={"flex"} pb={"50px"} mt={"20px"}>
        <Typography color='grey_500.main' fontSize={"1.2rem"}>
          <b>Làm rõ về việc liên kết với OpenAI: </b> ttsopenai.com là một đơn
          vị độc lập và không liên kết với OpenAI. Dịch vụ text-to-speech của
          chúng tôi sử dụng API của OpenAI để chuyển đổi văn bản thành giọng
          nói, nhưng chúng tôi hoạt động độc lập với OpenAI. Điều này được làm
          rõ để ngăn chặn bất kỳ sự nhầm lẫn hoặc hiểu lầm nào về mối quan hệ
          giữa ttsopenai.com và OpenAI. Người dùng nên nhận thức rằng trong khi
          chúng tôi sử dụng công nghệ của OpenAI để cung cấp dịch vụ của mình,
          ttsopenai.com hoàn toàn chịu trách nhiệm về việc hoạt động của dịch vụ
          và tuân thủ các Điều khoản Dịch vụ này.
        </Typography>
      </Box>
    </Box>
   
  );
};

export default TermsView;
