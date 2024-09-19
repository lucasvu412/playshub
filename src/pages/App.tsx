import {
  Avatar,
  Button,
  Col,
  Flex,
  Image,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import { RightOutlined } from "@ant-design/icons";
import useTelegramUser from "../hooks/useTelegramUser";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/account/profile";

function App() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const user = useTelegramUser();

  const games = [
    {
      name: "Cat Battle",
      image: "/icons/play/catbattle-icon.png",
      description: "Defense against alien invasion",
      link: `https://catb.playshub.io/?tgWebAppStartParam#tgWebAppData&user={id:${user?.id},first_name:${user?.first_name},last_name:${user?.last_name}}`,
    },
    {
      name: "Cat Lucky",
      image: "/icons/play/lucky-icon.png",
      description: "Get Big Rewards in Tower",
      link: `https://hoatrinh7604.github.io/tuk_t/?tgWebAppStartParam#tgWebAppData&user={id:${user?.id},first_name:${user?.first_name},last_name:${user?.last_name}}`,
    },
    {
      name: "Cat Challenge",
      image: "/icons/play/pvp-icon.png",
      description: "Play Realtime PvP with others",
      link: null,
    },
    {
      name: "NFTs Marketplace",
      image: "/icons/play/market-icon.png",
      description: "Sell & Buy Cat NFTs",
      link: null,
    },
  ];

  const play = async (link: string) => {
    window.open(link, "_self");
  };

  return (
    <div>
      <div style={{ padding: "10px 0px" }}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Flex vertical style={{ alignItems: "center" }}>
              <div style={{ padding: 10 }}>
                <Image
                  src="/icons/play/$plays-coin.png"
                  preview={false}
                  width={80}
                />
              </div>
              <div
                style={{
                  background: "#DBDBDB",
                  padding: "5px 40px",
                  borderRadius: 10,
                }}
              >
                <Typography.Text style={{ fontWeight: "bold" }}>
                  {data?.currency?.plays || 0}{" "}
                  <Typography.Text style={{ color: "#01BEED" }}>
                    $PLAYS
                  </Typography.Text>
                </Typography.Text>
              </div>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex gap="large" style={{ justifyContent: "center" }}>
              <Space style={{ alignItems: "center" }}>
                <Image
                  src="/icons/play/bnb-icon.png"
                  preview={false}
                  width={30}
                />
                <Typography.Text>{data?.currency?.bnb || 0}</Typography.Text>
              </Space>
              <Space style={{ alignItems: "center" }}>
                <Image
                  src="/icons/play/ton-icon.png"
                  preview={false}
                  width={30}
                />
                <Typography.Text>{data?.currency?.ton || 0}</Typography.Text>
              </Space>

              <Space style={{ alignItems: "center" }}>
                <Image
                  src="/icons/play/star-icon.png"
                  preview={false}
                  width={30}
                />
                <Typography.Text>0</Typography.Text>
              </Space>
            </Flex>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 10,
          borderRadius: 10,
          display: "flex",
          padding: 10,
          backgroundImage: "url(/images/banner.png)",
          aspectRatio: 3.2,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Button
          style={{ marginLeft: "auto", marginTop: "auto" }}
          icon={<RightOutlined />}
          iconPosition="end"
        >
          PLAY NOW
        </Button>
      </div>
      <div style={{ background: "white", padding: "10px" }}>
        <List
          header={
            <Flex>
              <Typography.Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#57A8E5",
                }}
              >
                Play to Earn More
              </Typography.Text>
              <Button style={{ marginLeft: "auto" }} type="text">
                See All
              </Button>
            </Flex>
          }
          itemLayout="horizontal"
          dataSource={games}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  disabled={!item.link}
                  type={item.link ? "primary" : "default"}
                  onClick={() => play(item.link!)}
                >
                  PLAY
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} shape="square" size={70} />}
                title={item.name}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default App;
