import { useTonConnectModal, useTonConnectUI } from "@tonconnect/ui-react";
import { Button, Drawer, Flex, Image, Space, Typography } from "antd";
import useTelegramUser from "../../hooks/useTelegramUser";
import { beginCell, toNano } from "@ton/core";
import { getQuestStatus } from "../../apis/quest/get-quest-status";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkQuest } from "../../apis/quest/check-quest";
import { proceedQuest } from "../../apis/quest/proceed-quest";
import { useEffect } from "react";
import { useNotification } from "../../providers/NotificationProvider";

export interface CheckInDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckInDrawer({ open, onClose }: CheckInDrawerProps) {
  const notification = useNotification()!;
  const [tonConnectUI] = useTonConnectUI();
  const { open: openTonConnectModal } = useTonConnectModal();
  const { data, refetch } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const checkQuestMutation = useMutation({
    mutationFn: () => checkQuest("DAILY", "CHECK_IN_TON_WALLET"),
  });
  const proceedQuestMutation = useMutation({
    mutationFn: () => proceedQuest("DAILY", "CHECK_IN_TON_WALLET"),
  });

  const task = data?.find((item) => item.requestType === "CHECK_IN_TON_WALLET");
  const earn = task?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0;

  const user = useTelegramUser();

  const checkIn = async () => {
    await proceedQuestMutation.mutateAsync();
    if (!tonConnectUI.connected) {
      openTonConnectModal();
      onClose();
      return;
    }

    const payload = beginCell()
      .storeUint(0, 32)
      .storeStringTail(`checked_in_${user?.id || ""}`)
      .endCell()
      .toBoc()
      .toString("base64");

    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: import.meta.env.VITE_CHECKED_IN_ADDRESS!,
          amount: toNano("0.001").toString(),
          payload,
        },
      ],
    });
  };

  useEffect(() => {
    if (checkQuestMutation.isSuccess) {
      notification.success("Completed");
      refetch();
      onClose();
    }
  }, [checkQuestMutation.isSuccess]);

  useEffect(() => {
    if (checkQuestMutation.isError) {
      notification.warning("You have not completed the quest");
    }
  }, [checkQuestMutation.isError]);

  return (
    <Drawer open={open} footer={null} placement="bottom" onClose={onClose}>
      <Flex vertical align="center" gap={15}>
        <Flex vertical align="center">
          <div style={{ padding: 10 }}>
            <Image src="/icons/earn/check-in.png" preview={false} width={80} />
          </div>
          <Space>
            <Typography.Text style={{ color: "#01BEED" }}>
              {`+${earn}`}
            </Typography.Text>
            <Image
              src="/icons/play/$plays-coin.png"
              width={20}
              preview={false}
            />
          </Space>
        </Flex>
        <Flex vertical align="center">
          <Typography.Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Ton Wallet
          </Typography.Text>
          <Typography.Text>
            Check in your Ton Wallet to get bonus
          </Typography.Text>
        </Flex>
        <Flex vertical gap={10} style={{ width: "70%" }}>
          <Button type="primary" onClick={checkIn} style={{ padding: 20 }}>
            Check in
          </Button>
          <Button
            type="default"
            style={{ padding: 20 }}
            onClick={() => checkQuestMutation.mutate()}
          >
            Check
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
}
