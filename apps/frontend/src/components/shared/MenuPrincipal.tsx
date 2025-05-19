'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { IconCalendarWeek, IconChartBar, IconClipboardText, IconCreditCardPay, IconGenderFemale, IconListCheck, IconLogin2, IconLogout2, IconMessage2Down, IconReceiptDollar, IconReportMoney, IconSettingsDollar, IconUsers } from '@tabler/icons-react';
import useSessao from '@/data/hooks/useSessao';

const MenuPrinicipal = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { usuario, encerrarSessao, isAdministrador } = useSessao()

  return (
    <nav>
      <div className="max-w-7xl">
        <div className="flex justify-between h-16 items-center">
          <div className="hidden md:flex space-x-4 items-center">
            <div className="group relative">
              <button className="text-zinc-400 hover:text-zinc-300 hover:bg-green-900 
                rounded-sm p-2 cursor-pointer">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconClipboardText size={16} />
                    <span>Regulamentos</span>
                </div>
              </button>
              <div className="absolute left-0 mt-[1px] hidden group-hover:flex flex-col 
                bg-green-900 shadow-lg rounded-md z-10 min-w-[200px]">
                <a href="http://localhost:4000/regulamento/cruzeiro"
                  target="_blank" rel="noopener noreferrer"
                  className="block text-sm px-2 py-1 text-zinc-200 hover:text-zinc-100"
                >
                  <div className='flex gap-1 items-center hover:bg-green-800 rounded-sm p-1'>
                    <IconClipboardText size={16} />
                    <span>Clube Cruzeiro</span>
                  </div>
                </a>
                <a href="http://localhost:4000/regulamento/atletico"
                  target="_blank" rel="noopener noreferrer"
                  className="block text-sm px-2 py-1 text-zinc-200 hover:text-zinc-100"
                >
                  <div className='flex gap-1 items-center hover:bg-green-800 rounded-sm p-1'>
                    <IconClipboardText size={16} />
                    <span>Clube Labareda</span>
                  </div>
                </a>
              </div>
            </div>

            <Link href="/convite" className="hover:bg-green-900 rounded-md p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconCreditCardPay size={16} />
                    <span>Convites</span>
                </div>
            </Link>
            
            <Link href="/pedido" className="hover:bg-green-900 rounded-md p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconListCheck size={16} />
                    <span>Pedidos</span>
                </div>
            </Link>
            
            { isAdministrador() && (
              <>
                <Link href="/periodoInscricao" className="hover:bg-green-900 rounded-md p-2">
                  <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                      hover:text-zinc-100 text-xs lg:text-[14px]">
                      <IconCalendarWeek size={16} />
                      <span>Periodos</span>
                  </div>
                </Link>
              
                <Link href="/usuario" className="hover:bg-green-900 rounded-md p-2">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                        hover:text-zinc-100 text-xs lg:text-[14px]">
                        <IconUsers size={16} />
                        <span>Usuários</span>
                    </div>
                </Link>

                <div className="group relative">
                  <button className="text-zinc-400 hover:text-zinc-300 hover:bg-green-900 
                    rounded-sm p-2 cursor-pointer">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                        hover:text-zinc-100 text-xs lg:text-[14px]">
                        <IconSettingsDollar size={16} />
                        <span>Financeiro</span>
                    </div>
                  </button>
                  <div className="absolute left-0 mt-[1px] hidden group-hover:flex flex-col 
                    bg-green-900 shadow-lg rounded-md z-10 min-w-[200px]">
                    <Link href="/retorno" className="block text-sm px-2 py-1 text-zinc-200 hover:text-zinc-100">
                      <div className='flex gap-1 items-center hover:bg-green-800 rounded-sm p-1'>
                        <IconMessage2Down size={16} />
                        <span>Retorno Bancário</span>
                      </div>
                    </Link>
                    <Link href="/relatorio" className="block text-sm px-2 py-1 text-zinc-200 hover:text-zinc-100">
                      <div className='flex gap-1 items-center hover:bg-green-800 rounded-sm p-1'>
                        <IconChartBar size={16} />
                        <span>Relatório de Pedidos</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {!usuario && (
              <Link href="/login" className="hover:bg-green-900 rounded-md p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconLogin2 size={16} />
                    <span>Login</span>
                </div>
            </Link>
            )}            

            <Link href="#" onClick={encerrarSessao} className="hover:bg-green-900 rounded-md p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconLogout2 size={16} />
                    <span>Sair</span>
                </div>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-zinc-200 hover:text-zinc-100 cursor-pointer">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-green-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <details className="group hover:bg-green-900 rounded-sm p-1">
              <summary className="cursor-pointer text-zinc-200 hover:text-zinc-100">
                <span className='text-xs lg:text-[14px]'>Regulamentos</span>
              </summary> 
              <div className="mt-1 w-full">
                <Link href="/anuncio" className="block text-zinc-200 hover:text-zinc-100
                        hover:bg-green-800 rounded-sm p-2">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                        hover:text-zinc-100 text-xs lg:text-[14px]">
                        <IconClipboardText size={16} />
                        <span>Clube Cruzeiro</span>
                    </div>
                </Link>
                <Link href="/anuncio" className="block text-zinc-200 hover:text-zinc-100
                        hover:bg-green-800 rounded-sm p-2">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                        hover:text-zinc-100 text-xs lg:text-[14px]">
                        <IconClipboardText size={16} />
                        <span>Clube Labareda</span>
                    </div>
                </Link>
              </div>
            </details>
            
            <Link href="/convite"
                className="block hover:bg-green-900 rounded-sm p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconCreditCardPay size={16} />
                    <span>Convites</span>
                </div>
            </Link>

            <Link href="/pedido"
                className="block hover:bg-green-900 rounded-sm p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconListCheck size={16} />
                    <span>Pedidos</span>
                </div>
            </Link>

            { isAdministrador() && (
              <>
                <Link href="/periodoInscricao"
                    className="block hover:bg-green-900 rounded-sm p-2">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                        hover:text-zinc-100 text-xs lg:text-[14px]">
                        <IconCalendarWeek size={16} />
                        <span>Períodos</span>
                    </div>
                </Link>

                <Link href="/usuario"
                    className="block hover:bg-green-900 rounded-sm p-2">
                    <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                        hover:text-zinc-100 text-xs lg:text-[14px]">
                        <IconUsers size={16} />
                        <span>Usuários</span>
                    </div>
                </Link>
              </>
            )}

            {!usuario && (
              <Link href="/login" className="block hover:bg-green-900 rounded-sm p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconLogin2 size={16} />
                    <span>Login</span>
                </div>
            </Link>
            )}

            { isAdministrador() && (
              <details className="group hover:bg-green-900 rounded-sm p-1">
                <summary className="cursor-pointer text-zinc-200 hover:text-zinc-100">
                  <span className='text-xs lg:text-[14px]'>Financeiro</span>
                </summary> 
                <div className="mt-1 w-full">
                  <Link href="/retorno" className="block text-zinc-200 hover:text-zinc-100
                          hover:bg-green-800 rounded-sm p-2">
                      <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                          hover:text-zinc-100 text-xs lg:text-[14px]">
                          <IconMessage2Down size={16} />
                          <span>Retorno Bancário</span>
                      </div>
                  </Link>
                  <Link href="/relatorio/pedido" className="block text-zinc-200 hover:text-zinc-100
                          hover:bg-green-800 rounded-sm p-2">
                      <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                          hover:text-zinc-100 text-xs lg:text-[14px]">
                          <IconChartBar size={16} />
                          <span>Relatório de Pedidos</span>
                      </div>
                  </Link>
                </div>
              </details>
            )}

            <Link href="/login" className="block hover:bg-green-900 rounded-sm p-2">
                <div className="flex items-center gap-0.5 lg:gap-1 text-zinc-200 
                    hover:text-zinc-100 text-xs lg:text-[14px]">
                    <IconLogout2 size={16} />
                    <span>Sair</span>
                </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MenuPrinicipal;