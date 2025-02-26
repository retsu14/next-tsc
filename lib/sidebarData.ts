import {
  AudioWaveform,
  GalleryVerticalEnd,
  Command,
  Settings2,
  LayoutTemplate,
  Layers,
  Sheet,
  File,
  Tag,
  Globe,
  Earth,
  Files,
  ReceiptText,
  FileText,
  Lock,
  ShieldCheck,
  User,
  Activity,
  House,
} from "lucide-react";

export const teams = [
  {
    name: "EliCMS",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

export const dashboard = {
  title: "Dashboard",
  url: "/",
  icon: House,
  isActive: true,
};

export const navMain = [
  {
    title: "CMS",
    url: "/componentsblueprint",
    isActive: true,
    icon: FileText,
    items: [
      { title: "Blueprint", url: "/blueprint", icons: Sheet },
      { title: "Blocks", url: "#", icons: LayoutTemplate },
      { title: "Contents", url: "#", icons: Layers },
      { title: "Forms", url: "#", icons: ReceiptText },
      { title: "Media", url: "#", icons: Files },
      { title: "Pages", url: "#", icons: File },
      { title: "Sites", url: "/sites", icons: Globe },
      { title: "Taxonomies", url: "#", icons: Tag },
      { title: "Globals", url: "#", icons: Earth },
    ],
  },
  {
    title: "ACCESS",
    url: "#",
    icon: Lock,
    items: [
      { title: "Admins", url: "#", icons: User },
      { title: "Roles", url: "#", icons: ShieldCheck },
    ],
  },
  {
    title: "SETTINGS",
    url: "#",
    icon: Settings2,
    items: [{ title: "Activities", url: "#", icons: Activity }],
  },
];
