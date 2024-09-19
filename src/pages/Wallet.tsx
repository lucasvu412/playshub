import { DisconnectOutlined } from "@ant-design/icons";
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
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
import { formatAddress } from "../utils/ton";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { bscTestnet } from "viem/chains";

export enum WalletType {
  TON = "TON",
  BNB = "BNB",
  PLAYS = "PLAYS",
}

export default function Wallet() {
  const { open } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const wallets = [
    {
      name: "PLAYS",
      image: "/icons/play/$plays-coin.png",
      usdPrice: "0",
      actions: [],
    },
    {
      name: "TON",
      image: "/icons/play/ton-icon.png",
      usdPrice: "0",
      actions: [
        tonConnectUI.connected ? (
          <Space>
            <Typography.Text>
              {formatAddress(userFriendlyAddress)}
            </Typography.Text>
            <Button
              onClick={async () => {
                await tonConnectUI.disconnect();
              }}
              icon={<DisconnectOutlined />}
            ></Button>
          </Space>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              open();
            }}
          >
            Connect
          </Button>
        ),
      ],
    },
    {
      name: "BNB",
      image: "/icons/play/bnb-icon.png",
      usdPrice: "0",
      actions: [
        isConnected ? (
          <Space>
            <Typography.Text>
              {address && formatAddress(address)}
            </Typography.Text>
            <Button
              onClick={() => {
                disconnect();
              }}
              icon={<DisconnectOutlined />}
            ></Button>
          </Space>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              connect({
                chainId: bscTestnet.id,
                connector: connectors[0],
              });
            }}
          >
            Connect
          </Button>
        ),
      ],
    },
  ];

  const selectedWallet = tonConnectUI.connected
    ? WalletType.TON
    : isConnected
      ? WalletType.BNB
      : WalletType.PLAYS;

  return (
    <div>
      <div style={{ padding: "40px" }}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Flex vertical style={{ alignItems: "center" }}>
              <div style={{ padding: 10 }}>
                <Image
                  src={
                    selectedWallet === WalletType.PLAYS
                      ? "/icons/play/$plays-coin.png"
                      : selectedWallet === WalletType.TON
                        ? "/icons/play/ton-icon.png"
                        : "/icons/play/bnb-icon.png"
                  }
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
                  0{" "}
                  <Typography.Text style={{ color: "#01BEED" }}>
                    {selectedWallet === WalletType.PLAYS
                      ? "$PLAYS"
                      : selectedWallet === WalletType.TON
                        ? "TON"
                        : "BNB"}
                  </Typography.Text>
                </Typography.Text>
              </div>
            </Flex>
          </Col>

          <Col span={24}>
            <Flex vertical align="center">
              <Space>
                <Button style={{ width: "100%" }} disabled>
                  Deposit
                </Button>
                <Button style={{ width: "100%" }} disabled>
                  Withdraw
                </Button>
              </Space>
            </Flex>
          </Col>
        </Row>
      </div>
      <div style={{ background: "white", padding: "10px" }}>
        <List
          header={
            <Typography.Text style={{ fontWeight: "bold" }}>
              Select tokens:
            </Typography.Text>
          }
          itemLayout="horizontal"
          dataSource={wallets}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} size={50} />}
                title={item.name}
                description={item.usdPrice}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
