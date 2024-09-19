import { Button, Layout, Menu, Result } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItem/MenuItem";
import PlayIcon from "../components/MenuItem/PlayIcon";
import EarnIcon from "../components/MenuItem/EarnIcon";
import RankIcon from "../components/MenuItem/RankIcon";
import WalletIcon from "../components/MenuItem/WalletIcon";
import InviteIcon from "../components/MenuItem/InviteIcon";
import { useMutation } from "@tanstack/react-query";
import { login } from "../apis/account/login";
import useTelegramUser from "../hooks/useTelegramUser";
import Loading from "../components/spin/Loading";
import { useEffect } from "react";

const { Content, Footer } = Layout;

function DashboardContent() {
  const user = useTelegramUser();

  const referralId = Telegram?.WebApp?.initDataUnsafe?.start_param;

  const { isError, isPending, mutate } = useMutation({
    mutationFn: () =>
      login(
        user?.id?.toString(),
        `${user?.first_name || ""} ${user?.last_name || ""}`,
        referralId ? referralId.match(/ref_(\w+)/)[1] : undefined
      ),
  });

  useEffect(() => {
    mutate();
  }, []);

  if (!user) {
    return (
      <Result status="403" title="403" subTitle="Not supported platform." />
    );
  }

  if (isError) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button
            type="primary"
            onClick={() => {
              mutate();
            }}
          >
            Retry
          </Button>
        }
      />
    );
  }

  if (isPending) {
    return <Loading />;
  }

  return <Outlet />;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname.split("/")[1] || "play";

  const onSelect = ({ key }: { key: string }) => {
    switch (key) {
      case "wallet":
        navigate("/wallet");
        break;
      case "play":
        navigate("/");
        break;
      case "earn":
        navigate("/earn");
        break;
      case "rank":
        navigate("/rank");
        break;
      case "invite":
        navigate("/invite");
        break;
    }
  };

  return (
    <div>
      <Layout>
        <Content
          style={{
            padding: "10px 10px",
            minHeight: "100vh",
          }}
        >
          {<DashboardContent />}
          <div style={{ height: 68 }} />
        </Content>
        <Footer
          style={{
            padding: " 0px",
            position: "fixed",
            width: "100%",
            bottom: 0,
          }}
        >
          <Menu
            onSelect={onSelect}
            style={{ width: "100%" }}
            mode="horizontal"
            items={[
              {
                key: "wallet",
                label: (
                  <MenuItem
                    active={activeKey === "wallet"}
                    title="Wallet"
                    icon={<WalletIcon active={activeKey === "wallet"} />}
                  />
                ),
              },
              {
                key: "earn",
                label: (
                  <MenuItem
                    active={activeKey === "earn"}
                    title="Earn"
                    icon={<EarnIcon active={activeKey === "earn"} />}
                  />
                ),
              },
              {
                key: "play",
                label: (
                  <MenuItem
                    active={activeKey === "play"}
                    title="Play"
                    icon={<PlayIcon active={activeKey === "play"} />}
                  />
                ),
              },
              {
                key: "invite",
                label: (
                  <MenuItem
                    active={activeKey === "invite"}
                    title="Invite"
                    icon={<InviteIcon active={activeKey === "invite"} />}
                  />
                ),
              },
              {
                key: "rank",
                label: (
                  <MenuItem
                    active={activeKey === "rank"}
                    title="Rank"
                    icon={<RankIcon active={activeKey === "rank"} />}
                  />
                ),
              },
            ]}
          ></Menu>
        </Footer>
      </Layout>
    </div>
  );
}
