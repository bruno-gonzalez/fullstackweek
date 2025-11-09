"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Calendar,
  CalendarIcon,
  HomeIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
              <SheetTitle>
                <span className="font-bold text-lg">Menu</span>
              </SheetTitle>
            </SheetHeader>
            <div className="p-5">
              {status === "authenticated" ? (
                <div className="flex items-center gap-2 mb-12">
                  <Avatar>
                    <AvatarImage src={data.user?.image || ""} />
                    <AvatarFallback>
                      {data.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{data.user?.name}</p>
                  <Button
                    className="justify-center ml-auto"
                    variant="outline"
                    size="icon"
                    onClick={() => signOut()}
                  >
                    <ArrowLeftFromLine />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 justify-center w-full mb-8">
                  <div className="flex items-center gap-2">
                    <UserIcon className="opacity-40" size={36} />
                    <p>Olá, Faça seu login!</p>
                  </div>
                  <Button
                    className="flex justify-start"
                    variant="outline"
                    onClick={() => signIn()}
                  >
                    <ArrowRightFromLine />
                    <span className="text-center">Fazer Login</span>
                  </Button>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon />
                    Início
                  </Link>
                </Button>

                {data?.user && (
                  <Button
                    variant="outline"
                    className="justify-start gap-2 w-full"
                    asChild
                  >
                    <Link href="/bookings">
                      <Calendar />
                      Meus Agendamentos
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
