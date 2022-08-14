package com.JJP.restapiserver.domain.dto.member.response;

public class MailBodyUtil {
    public String getBody(String username, String password) {
        String body1 = "<p style=\"font-size: 10pt; font-family: sans-serif; padding: 0 0 0 10pt\">\n" +
                "  <br />\n" +
                "</p>\n" +
                "<table\n" +
                "  align=\"center\"\n" +
                "  width=\"700\"\n" +
                "  border=\"0\"\n" +
                "  cellpadding=\"0\"\n" +
                "  cellspacing=\"0\"\n" +
                "  style=\"border: 1px solid #bbc0c4\"\n" +
                ">\n" +
                "  <tbody>\n" +
                "    <tr>\n" +
                "      <td style=\"padding: 24px 14px 0\">\n" +
                "        <table width=\"670\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                "          <tbody>\n" +
                "            <!-- 상단메인배너 -->\n" +
                "            <tr>\n" +
                "              <td>\n" +
                "                <img\n" +
                "                  src=\"https://s3.us-west-2.amazonaws.com/secure.notion-static.com/42b0d27e-0fc1-4e71-bbaa-b249a117b5ec/moggozi.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220808T023013Z&X-Amz-Expires=86400&X-Amz-Signature=73e51f0f6bfb30518cb6668b0de587cff9a5b3caf5e9f12facb1780c0804672c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22moggozi.jpg%22&x-id=GetObject\"\n" +
                "                  alt=\"123\"\n" +
                "                />\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <!-- //상단메인배너 --><!-- 인사말 -->\n" +
                "            <tr>\n" +
                "              <td\n" +
                "                style=\"\n" +
                "                  padding: 50px 0 0 10px;\n" +
                "                  font-size: 12px;\n" +
                "                  font-family: Gulim;\n" +
                "                  color: #393939;\n" +
                "                  line-height: 19px;\n" +
                "                \"\n" +
                "              >\n" +
                "                <p>\n" +
                "                  안녕하세요.\n" +
                "                  <strong>모꼬지 (Moggozi)</strong> 입니다.<br />\n" +
                "                  항상 저희 사이트를 이용해주셔서 감사합니다.\n" +
                "                </p>\n" +
                "                <p style=\"margin-top: 13px\">\n" +
                "                  <strong>고객님의 가입정보는 다음과 같습니다.\n" +
                "                </p>\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <!-- //인사말 -->\n" +
                "            <tr>\n" +
                "              <td>\n" +
                "                <!-- 컨텐츠 -->\n" +
                "                <table\n" +
                "                  width=\"670\"\n" +
                "                  border=\"0\"\n" +
                "                  cellpadding=\"0\"\n" +
                "                  cellspacing=\"0\"\n" +
                "                  style=\"\n" +
                "                    font-size: 12px;\n" +
                "                    font-family: Gulim;\n" +
                "                    color: #393939;\n" +
                "                    line-height: 19px;\n" +
                "                  \"\n" +
                "                >\n" +
                "                  <tbody>\n" +
                "                    <tr>\n" +
                "                      <td height=\"40\">&nbsp;</td>\n" +
                "                    </tr>\n" +
                "                    <!-- 컨텐츠 공통 여백 --><!-- 가입 정보 -->\n" +
                "                    <tr>\n" +
                "                      <td>\n" +
                "                        <table\n" +
                "                          width=\"100%\"\n" +
                "                          border=\"0\"\n" +
                "                          cellpadding=\"0\"\n" +
                "                          cellspacing=\"0\"\n" +
                "                          style=\"margin: 0 0 20px\"\n" +
                "                        >\n" +
                "                          <tbody>\n" +
                "                            <tr>\n" +
                "                              <td valign=\"middle\" width=\"19\">\n" +
                "                                <img\n" +
                "                                  src=\"http://m-img.cafe24.com/images/template/admin/kr/ico_title.gif\"\n" +
                "                                  alt=\"\"\n" +
                "                                />\n" +
                "                              </td>\n" +
                "                              <td valign=\"middle\">\n" +
                "                                <strong\n" +
                "                                  style=\"\n" +
                "                                    font-size: 13px;\n" +
                "                                    font-family: Gulim;\n" +
                "                                    color: #1c1c1c;\n" +
                "                                  \"\n" +
                "                                  >가입 정보</strong\n" +
                "                                >\n" +
                "                              </td>\n" +
                "                            </tr>\n" +
                "                          </tbody>\n" +
                "                        </table>\n" +
                "                        <table\n" +
                "                          width=\"100%\"\n" +
                "                          border=\"0\"\n" +
                "                          cellpadding=\"0\"\n" +
                "                          cellspacing=\"0\"\n" +
                "                          style=\"\n" +
                "                            font-size: 12px;\n" +
                "                            font-family: Gulim;\n" +
                "                            line-height: 15px;\n" +
                "                            border-top: 1px solid #d5d5d5;\n" +
                "                          \"\n" +
                "                        >\n" +
                "                          <tbody>\n" +
                "                            <tr>\n" +
                "                              <th\n" +
                "                                align=\"left\"\n" +
                "                                colspan=\"1\"\n" +
                "                                rowspan=\"1\"\n" +
                "                                scope=\"row\"\n" +
                "                                valign=\"middle\"\n" +
                "                                width=\"22%\"\n" +
                "                                style=\"\n" +
                "                                  padding: 13px 10px 10px;\n" +
                "                                  font-weight: normal;\n" +
                "                                  background-color: #f5f6f5;\n" +
                "                                  border-bottom: 1px solid #d5d5d5;\n" +
                "                                  border-right: 1px solid #d5d5d5;\n" +
                "                                  border-left: 1px solid #d5d5d5;\n" +
                "                                  color: #80878d;\n" +
                "                                \"\n" +
                "                              >\n" +
                "                                이메일\n" +
                "                              </th>\n" +
                "                              <td\n" +
                "                                align=\"left\"\n" +
                "                                valign=\"middle\"\n" +
                "                                width=\"28%\"\n" +
                "                                style=\"\n" +
                "                                  padding: 13px 10px 10px;\n" +
                "                                  border-bottom: 1px solid #d5d5d5;\n" +
                "                                  border-right: 1px solid #d5d5d5;\n" +
                "                                  color: #393939;\n" +
                "                                \"\n" +
                "                              >\n";
                String body2 = username +  "</td>\n" +
                "                              <th\n" +
                "                                align=\"left\"\n" +
                "                                colspan=\"1\"\n" +
                "                                rowspan=\"1\"\n" +
                "                                scope=\"row\"\n" +
                "                                valign=\"middle\"\n" +
                "                                width=\"22%\"\n" +
                "                                style=\"\n" +
                "                                  padding: 13px 10px 10px;\n" +
                "                                  font-weight: normal;\n" +
                "                                  background-color: #f5f6f5;\n" +
                "                                  border-bottom: 1px solid #d5d5d5;\n" +
                "                                  border-right: 1px solid #d5d5d5;\n" +
                "                                  color: #80878d;\n" +
                "                                \"\n" +
                "                              >\n" +
                "                                임시비밀번호\n" +
                "                              </th>\n" +
                "                              <td\n" +
                "                                align=\"left\"\n" +
                "                                valign=\"middle\"\n" +
                "                                width=\"28%\"\n" +
                "                                style=\"\n" +
                "                                  padding: 13px 10px 10px;\n" +
                "                                  border-bottom: 1px solid #d5d5d5;\n" +
                "                                  border-right: 1px solid #d5d5d5;\n" +
                "                                  color: #393939;\n" +
                "                                \"\n" +
                "                              >\n" + password +
                "                              \n</td>\n" +
                "                            </tr>\n" +
                "                          </tbody>\n" +
                "                        </table>\n" +
                "                      </td>\n" +
                "                    </tr>\n" +
                "                    <!-- //가입 정보 -->\n" +
                "                  </tbody>\n" +
                "                </table>\n" +
                "                <!-- //컨텐츠 -->\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <!-- 맺음말 -->\n" +
                "            <tr>\n" +
                "              <td\n" +
                "                style=\"\n" +
                "                  padding: 30px 0 60px 10px;\n" +
                "                  font-size: 12px;\n" +
                "                  font-family: Gulim;\n" +
                "                  color: #393939;\n" +
                "                  line-height: 19px;\n" +
                "                \"\n" +
                "              >\n";
        String body3 =
                "                <p>\n" +
                "                  임시비밀번호를 수정하려면, \"마이페이지 > 회원정보 수정 > 비밀번호 수정\" 에서 변경하실\n" +
                "                  수 있습니다.\n" +
                "                </p>\n" +
                "                <p style=\"margin-top: 13px\">\n" +
                "                  고객님의 방문을 기다리겠습니다. 늘 행복 가득하세요~\n" +
                "                </p>\n" +
                "              </td>\n" +
                "            </tr>\n" +
                "            <!-- //맺음말 -->\n" +
                "          </tbody>\n" +
                "        </table>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    <!-- 회사소개 -->\n" +
                "    <tr>\n" +
                "      <td\n" +
                "        style=\"\n" +
                "          padding: 24px 34px;\n" +
                "          font-family: Gulim;\n" +
                "          font-size: 12px;\n" +
                "          line-height: 18px;\n" +
                "          background-color: #cacdd4;\n" +
                "          color: #fff;\n" +
                "        \"\n" +
                "      >\n" +
                "        <p>\n" +
                "          Email 문의 : <strong>moggozi.ssafy@daum.net</strong><br />\n" +
                "        </p>\n" +
                "        <p>\n" +
                "          Copyright(c) Team, Moggozi all rights reserved.\n" +
                "          <strong>\n" +
                "          <a\n" +
                "            href=\"i7c201.p.ssafy.io\"\n" +
                "            target=\"_blank\"\n" +
                "            style=\"color: #fff; text-decoration: none\"\n" +
                "            rel=\"noreferrer noopener\"\n" +
                "            >i7c201.p.ssafy.io</a\n" +
                "          ></strong>\n" +
                "        </p>\n" +
                "      </td>\n" +
                "    </tr>\n" +
                "    <!-- //회사소개 -->\n" +
                "  </tbody>\n" +
                "</table>\n";

        return body1 + body2 + body3;
    }

}
