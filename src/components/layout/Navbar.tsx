import { Icon } from "@iconify-icon/react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavLink } from "react-router-dom";

interface INavigationItemContent {
  id: number;
  label: string;
  route?: string;
}
interface INavigationItem {
  id: number;
  itemLabel?: string;
  itemRoute?: string;
  triggerLabel?: string;
  content?: INavigationItemContent[];
}

const navigationItems: INavigationItem[] = [
  {
    id: 1,
    triggerLabel: "Tabelas",
    content: [
      {
        id: 1,
        label: "Tags",
        route: "/dados/tags",
      },
      {
        id: 2,
        label: "Publicos Alvos",
        route: "/dados/publico-alvo",
      },
      {
        id: 3,
        label: "Vídeo",
        route: "/dados/vídeos",
      },
    ],
  },
  {
    id: 2,
    triggerLabel: "Componentes",
    content: [
      {
        id: 1,
        label: "Tags",
        route: "/tabelas/tags",
      },
      {
        id: 2,
        label: "Tabela",
        route: "/tabela",
      },
      {
        id: 3,
        label: "popover",
        route: "/popover",
      },
    ],
  },
];

export const Navbar = () => {
  return (
    <NavigationMenu.Root className="bg-primary flex h-full items-center justify-center">
      <NavigationMenu.List className="flex">
        {navigationItems.map((item) => (
          <NavigationMenu.Item key={item.id} className="relative m-0">
            {item.itemLabel ? (
              <NavLink
                to={item.itemRoute ?? ""}
                className="flex cursor-pointer items-center justify-center px-4 py-2 font-bold tracking-wide text-white hover:text-neutral-200"
              >
                {" "}
                {item.itemLabel}
              </NavLink>
            ) : (
              <>
                <NavigationMenu.Trigger className="inline-flex cursor-pointer px-4 py-2 font-bold tracking-wide text-white hover:text-neutral-200">
                  {item.triggerLabel}

                  <Icon
                    icon="ri:arrow-down-s-line"
                    className="self-center"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="data-[motion=from-start]:animate-enter-from-right data-[motion=from-end]:animate-enter-from-left data-[motion=to-start]:animate-exit-to-right data-[motion=to-end]:animate-exit-to-left w data-[state=open]:animate-scale-in data-[state=closes]:animate-scale-out absolute top-10 w-44 rounded-md bg-white shadow-md">
                  <Icon
                    icon="bxs:up-arrow"
                    className="absolute -top-2 left-6 text-white"
                  />
                  <ul className="p-2">
                    {item.content?.map((itemContent) => (
                      <li key={itemContent.id} className="cursor-pointer">
                        <NavigationMenu.Link
                          asChild
                          className="block rounded-md p-2 hover:bg-gray-200"
                        >
                          <NavLink
                            to={itemContent.route ?? ""}
                            className="block"
                          >
                            {itemContent.label}
                          </NavLink>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
