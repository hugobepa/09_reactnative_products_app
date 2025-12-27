import { Ionicons } from "@expo/vector-icons";

interface Props {
title: string;
icon: keyof typeof Ionicons.glyphMap;
}

---

import { Ionicons } from "@expo/vector-icons";

 <Ionicons name={icon} size={30}  />
