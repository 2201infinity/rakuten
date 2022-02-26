import React, { useEffect, useState } from "react";
import type { FC } from "react";
import styled from "styled-components";
import colors from "styles/colors";
import Button from "components/Button";
import axios from "axios";
import { ILink } from "types/link";
import { useParams } from "react-router-dom";
import { dateConvert } from "utils/data";
import { getFileSize } from "utils/getFileSize";
import { today, baseUrl, API_URL, wrongImagePath } from "utils/constants";

const DetailPage: FC = () => {
  const { linkKey } = useParams();
  const [linkItem, setLinkItem] = useState<ILink>();

  useEffect(() => {
    const getLinkData = async () => {
      const { data } = await axios.get<ILink[]>(API_URL);
      setLinkItem(data.filter((data) => data.key === linkKey)[0]);
    };
    if (linkKey) getLinkData();
  }, [linkKey]);

  const handleAlert = () => {
    alert("다운로드되었습니다.");
  };

  if (!linkItem) return null;

  const {
    count,
    created_at,
    expires_at,
    download_count,
    thumbnailUrl,
    files,
    key,
    sent,
    size,
    summary,
  }: ILink = linkItem;

  const isWrongImg = (url: string) => url === wrongImagePath;

  return (
    <>
      <Header>
        <LinkInfo>
          <Title>{summary}</Title>
          <Url>{baseUrl + key}</Url>
        </LinkInfo>
        <DownloadButton>
          <img
            referrerPolicy="no-referrer"
            src="/svgs/download.svg"
            alt="download-button"
            onClick={handleAlert}
          />
          받기
        </DownloadButton>
      </Header>
      <Article>
        <Descrition>
          <Texts>
            <Top>링크 생성일</Top>
            <Bottom>{dateConvert(created_at)}</Bottom>
            <Top>메세지</Top>
            <Bottom>{sent?.content}</Bottom>
            <Top>다운로드 횟수</Top>
            <Bottom>{download_count}</Bottom>
          </Texts>
          <LinkImage>
            <Image isWrongImg={isWrongImg(thumbnailUrl)} />
          </LinkImage>
        </Descrition>
        <ListSummary>
          <div>총 {count}개의 파일</div>
          <div>{getFileSize(size)}</div>
        </ListSummary>
        {expires_at > today ? (
          <FileList>
            {files.map(({ name, size }) => (
              <FileListItem key={name}>
                <FileItemInfo>
                  <span />
                  <span>{name}</span>
                </FileItemInfo>
                <FileItemSize>{getFileSize(size)}</FileItemSize>
              </FileListItem>
            ))}
          </FileList>
        ) : (
          ""
        )}
      </Article>
    </>
  );
};

const Header = styled.header`
  display: flex;
  color: ${colors.grey600};
  margin-bottom: 32px;
`;

const LinkInfo = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 28px;
  color: ${colors.grey700};
  font-size: 20px;
`;

const Url = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  text-decoration: underline;
  line-height: 20px;
  font-size: 14px;

  :hover {
    color: ${colors.teal700};
  }
`;

const DownloadButton = styled(Button)`
  font-size: 16px;

  img {
    margin-right: 8px;
  }
`;

const Article = styled.article`
  border-radius: 4px;
  border-color: ${colors.grey200};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 0 0 1px rgb(0 20 61 / 8%), 0 3px 3px 0 rgb(0 20 61 / 4%);
  background-color: ${colors.white};
  color: ${colors.grey600};
  font-size: 14px;
  font-weight: 400;
`;

const Descrition = styled.div`
  display: flex;
  padding: 36px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 24px;
  }
`;

const Texts = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Top = styled.label`
  font-weight: 600;
  line-height: 20px;
`;

const Bottom = styled.p`
  color: ${colors.grey700};
  margin: 8px 0 24px;
`;

const LinkImage = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background-color: ${colors.grey50};

  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }
`;

const Image = styled.span<{ isWrongImg: boolean }>`
  width: 120px;
  display: inline-block;
  background-image: ${(props) =>
    props.isWrongImg ? "url(/svgs/default.svg)" : "url(`${thumbnailUrl}`)"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100%;
`;

const ListSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 36px;
  font-weight: 600;
  border-top: 1px solid;
  border-color: ${colors.grey200};

  @media (max-width: 768px) {
    padding: 12px 24px;
  }
`;

const FileList = styled.ul`
  border-top: 1px solid;
  border-color: ${colors.grey200};
  padding: 0;
  margin: 0;
  padding: 0 36px;
  color: ${colors.grey700};

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  & > li + li {
    border-top: 1px solid;
    border-color: ${colors.grey200};
  }
`;

const FileListItem = styled.li`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileItemInfo = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  align-items: center;

  span:first-child {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    display: inline-block;
    background-image: url(/svgs/default.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const FileItemSize = styled.div``;

export default DetailPage;
