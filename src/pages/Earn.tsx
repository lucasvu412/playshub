import {
  Avatar,
  Button,
  Col,
  Flex,
  Image,
  List,
  Progress,
  Row,
  Space,
  Typography,
} from "antd";
import CheckInDrawer from "../components/drawers/CheckInDrawer";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestStatus } from "../apis/quest/get-quest-status";
import Loading from "../components/spin/Loading";
import ConnectWalletDrawer from "../components/drawers/ConnectWalletDrawer";
import PlayCatBDrawer from "../components/drawers/PlayCatBDrawer";
import InviteFriendDrawer from "../components/drawers/InviteFriendDrawer";
import VisitPlaysCommunityDrawer from "../components/drawers/VisitPlaysCommunityDrawer";
import VisitOfficialWebsiteDrawer from "../components/drawers/VisitOfficialWebsiteDrawer";
import JoinPlayChannelDrawer from "../components/drawers/JoinPlayChannelDrawer";
import JoinPlayChatDrawer from "../components/drawers/JoinPlayChatDrawer";
import FollowXDrawer from "../components/drawers/FollowXDrawer";
import { checkQuest } from "../apis/quest/check-quest";

export default function Earn() {
  const [openCheckInDrawer, setOpenCheckInOpenDrawer] = useState(false);
  const [openPlayCatBDrawer, setOpenPlayCatBDrawer] = useState(false);
  const [openInviteFriendDrawer, setOpenInviteFriendDrawer] = useState(false);
  const [openVisitPlaysCommunityDrawer, setOpenVisitPlaysCommunityDrawer] =
    useState(false);
  const [openVisitOfficialWebsiteDrawer, setOpenVisitOfficialWebsiteDrawer] =
    useState(false);
  const [openConnectTonDrawer, setOpenConnectTonOpenDrawer] = useState(false);
  const [openJoinPlaysChannelDrawer, setOpenJoinPlaysChannelDrawer] =
    useState(false);
  const [openJoinPlaysChatDrawer, setOpenJoinPlaysChatDrawer] = useState(false);
  const [openFollowXDrawer, setOpenFollowXDrawer] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const checkQuestCompleteDailyMutation = useMutation({
    mutationFn: () => checkQuest("DAILY", "COMPLETE_DAILY_TASK"),
  });

  const checkInTonWalletDailyTask = data?.find(
    (item) => item.requestType === "CHECK_IN_TON_WALLET"
  );
  const playCatBattleDailyTask = data?.find(
    (item) => item.requestType === "PLAY_CAT_BATTLE"
  );
  const inviteDailyTask = data?.find((item) => item.requestType === "INVITE");
  const visitPlaysCommunityDailyTask = data?.find(
    (item) => item.requestType === "VISIT_PLAYS_COMMUNITY"
  );
  const visitOfficialDailyTask = data?.find(
    (item) => item.requestType === "VISIT_OFFICIAL_WEBSITE"
  );
  const completeDailyTask = data?.find(
    (item) => item.requestType === "COMPLETE_DAILY_TASK"
  );

  const dailyTasks = [
    {
      name: "Check-in TON Wallet",
      image: "/icons/earn/check-in.png",
      earn: checkInTonWalletDailyTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (checkInTonWalletDailyTask?.progressAmount || 0) >=
        (checkInTonWalletDailyTask?.requestAmount || 0),
      onclick: () => setOpenCheckInOpenDrawer(true),
    },
    {
      name: "Play Cat Battle 1 time",
      image: "/icons/earn/play.png",
      earn: playCatBattleDailyTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (playCatBattleDailyTask?.progressAmount || 0) >=
        (playCatBattleDailyTask?.requestAmount || 0),
      onclick: () => {
        setOpenPlayCatBDrawer(true);
      },
    },
    {
      name: "Invite 1 friend",
      image: "/icons/earn/invite.png",
      earn: inviteDailyTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (inviteDailyTask?.progressAmount || 0) >=
        (inviteDailyTask?.requestAmount || 0),
      onclick: () => {
        setOpenInviteFriendDrawer(true);
      },
    },
    {
      name: "Visit PLAYS Community",
      image: "/icons/earn/visit-community.png",
      earn:
        visitPlaysCommunityDailyTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (visitPlaysCommunityDailyTask?.progressAmount || 0) >=
        (visitPlaysCommunityDailyTask?.requestAmount || 0),
      onclick: () => {
        setOpenVisitPlaysCommunityDrawer(true);
      },
    },
    {
      name: "Visit official website",
      image: "/icons/earn/visit-website.png",
      earn: visitOfficialDailyTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (visitOfficialDailyTask?.progressAmount || 0) >=
        (visitOfficialDailyTask?.requestAmount || 0),
      onclick: () => {
        setOpenVisitOfficialWebsiteDrawer(true);
      },
    },
  ];

  const connectTonWalletTask = data?.find(
    (item) => item.requestType === "CONNECT_TON_WALLET"
  );
  const joinPlaysChannelTask = data?.find(
    (item) => item.requestType === "JOIN_PLAYS_CHANNEL"
  );
  const joinPlaysChatTask = data?.find(
    (item) => item.requestType === "JOIN_PLAYS_CHAT"
  );
  const followPlaysOnXTask = data?.find(
    (item) => item.requestType === "FOLLOW_PLAYS_ON_X"
  );

  const tasks = [
    {
      name: "Connect Ton Wallet",
      image: "/icons/earn/connect-ton-wallet.png",
      earn: connectTonWalletTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (connectTonWalletTask?.progressAmount || 0) >=
        (connectTonWalletTask?.requestAmount || 0),
      onclick: () => {
        setOpenConnectTonOpenDrawer(true);
      },
    },
    {
      name: "Join PLAYS channel",
      image: "/icons/earn/join-play-channel.png",
      earn: joinPlaysChannelTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (joinPlaysChannelTask?.progressAmount || 0) >=
        (joinPlaysChannelTask?.requestAmount || 0),
      onclick: () => {
        setOpenJoinPlaysChannelDrawer(true);
      },
    },
    {
      name: "Join PLAYS Chat",
      image: "/icons/earn/join-play-chat.png",
      earn: joinPlaysChatTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (joinPlaysChatTask?.progressAmount || 0) >=
        (joinPlaysChatTask?.requestAmount || 0),
      onclick: () => {
        setOpenJoinPlaysChatDrawer(true);
      },
    },
    {
      name: "Follow PLAYS on X",
      image: "/icons/earn/follow-play.png",
      earn: followPlaysOnXTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done:
        (followPlaysOnXTask?.progressAmount || 0) >=
        (followPlaysOnXTask?.requestAmount || 0),
      onclick: () => {
        setOpenFollowXDrawer(true);
      },
    },
  ];

  const doneTasks = dailyTasks.filter((task) => task.done);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ padding: "10px 0px" }}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Flex vertical style={{ alignItems: "center" }}>
              <div style={{ padding: 10 }}>
                <Image
                  src="/icons/earn/earn-icon.png"
                  preview={false}
                  width={80}
                />
              </div>
              <div>
                <Typography.Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Earn $PLAYS
                </Typography.Text>
              </div>
            </Flex>
          </Col>
        </Row>
      </div>

      <div>
        <div>
          <Flex align="center" gap={10} style={{ marginBottom: 5 }}>
            <Typography.Text
              style={{ color: "#767676", fontWeight: "bold" }}
            >{`DAILY TASKS (${doneTasks.length}/${dailyTasks.length})`}</Typography.Text>
            <Space>
              <Image
                src="/icons/play/$plays-coin.png"
                width={20}
                preview={false}
              />
              <Typography.Text
                style={{ color: "#01BEED" }}
              >{`+${completeDailyTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0}`}</Typography.Text>
            </Space>
            <Button
              style={{ marginLeft: "auto" }}
              type={
                doneTasks.length < dailyTasks.length ? "default" : "primary"
              }
              onClick={() => checkQuestCompleteDailyMutation.mutate()}
              disabled={doneTasks.length < dailyTasks.length}
            >
              Claim
            </Button>
          </Flex>
          <Progress
            percent={(doneTasks.length / dailyTasks.length) * 100}
            showInfo={false}
          />
        </div>
        <div style={{ background: "white", padding: "10px" }}>
          <List
            itemLayout="horizontal"
            dataSource={dailyTasks}
            renderItem={(item) => (
              <List.Item style={{ cursor: "pointer" }} onClick={item.onclick}>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} shape="square" size={70} />}
                  title={item.name}
                  description={
                    <Space>
                      <Image
                        src="/icons/play/$plays-coin.png"
                        width={22}
                        preview={false}
                      />
                      <Typography.Text
                        style={{ color: "#01BEED" }}
                      >{`+${item.earn}`}</Typography.Text>
                    </Space>
                  }
                />
                <div style={{ marginRight: 15 }}>
                  {item.done && (
                    <Image
                      src="/icons/earn/done-stick.png"
                      width={30}
                      preview={false}
                    />
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <div>
          <Flex align="center" gap={10} style={{ marginBottom: 5 }}>
            <Typography.Text style={{ color: "#767676", fontWeight: "bold" }}>
              TASKS
            </Typography.Text>
          </Flex>
        </div>
        <div style={{ background: "white", padding: "10px" }}>
          <List
            itemLayout="horizontal"
            dataSource={tasks}
            renderItem={(item) => (
              <List.Item style={{ cursor: "pointer" }} onClick={item.onclick}>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} shape="square" size={70} />}
                  title={item.name}
                  description={
                    <Space>
                      <Image
                        src="/icons/play/$plays-coin.png"
                        width={22}
                        preview={false}
                      />
                      <Typography.Text
                        style={{ color: "#01BEED" }}
                      >{`+${item.earn}`}</Typography.Text>
                    </Space>
                  }
                />
                <div style={{ marginRight: 15 }}>
                  {item.done && (
                    <Image
                      src="/icons/earn/done-stick.png"
                      width={30}
                      preview={false}
                    />
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>

      <CheckInDrawer
        open={openCheckInDrawer}
        onClose={() => {
          setOpenCheckInOpenDrawer(false);
        }}
      />
      <PlayCatBDrawer
        open={openPlayCatBDrawer}
        onClose={() => {
          setOpenPlayCatBDrawer(false);
        }}
      />
      <InviteFriendDrawer
        open={openInviteFriendDrawer}
        onClose={() => {
          setOpenInviteFriendDrawer(false);
        }}
      />
      <VisitPlaysCommunityDrawer
        open={openVisitPlaysCommunityDrawer}
        onClose={() => {
          setOpenVisitPlaysCommunityDrawer(false);
        }}
      />
      <VisitOfficialWebsiteDrawer
        open={openVisitOfficialWebsiteDrawer}
        onClose={() => {
          setOpenVisitOfficialWebsiteDrawer(false);
        }}
      />
      <ConnectWalletDrawer
        open={openConnectTonDrawer}
        onClose={() => {
          setOpenConnectTonOpenDrawer(false);
        }}
      />
      <JoinPlayChannelDrawer
        open={openJoinPlaysChannelDrawer}
        onClose={() => {
          setOpenJoinPlaysChannelDrawer(false);
        }}
      />
      <JoinPlayChatDrawer
        open={openJoinPlaysChatDrawer}
        onClose={() => {
          setOpenJoinPlaysChatDrawer(false);
        }}
      />
      <FollowXDrawer
        open={openFollowXDrawer}
        onClose={() => {
          setOpenFollowXDrawer(false);
        }}
      />
    </div>
  );
}
