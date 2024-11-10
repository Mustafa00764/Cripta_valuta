import React from 'react'
import infoIco from '../assets/svg/info-ico.svg';
import locked from '../assets/svg/locked.svg';
import flagmap from '../assets/svg/flagmap.svg';
import shareico from '../assets/svg/shareico.svg';
import arrowR from '../assets/svg/arrowR.svg';
import top1 from '../assets/svg/Top1new.svg';
import top2 from '../assets/svg/top2.svg';
import top3 from '../assets/svg/top3.svg';
import hidan from '../assets/images/HIDAN.jpg';
import venom from '../assets/images/Venom.jpg';
import Deadpool from '../assets/images/Deadpool.jpg';
import AirdropModal from '../components/AirdropModal';

const AirdropCustom = () => {
  return (
    <div className="bg-pageMode">
      <div className="container flex justify-center items-start">
        <div className="controller-all mt-[50px] p-[0px]">
          <div className="bg-[#041938] w-full rounded-[16px] p-[24px]">
            <div className="flex items-center gap-[24px] mb-[24px]">
              <img className='rounded-[8px]' src="https://dappradar.com/image-resizer/width=80,quality=100/https://quests.dappradar.com/assets/swing-dapp-defi-matic-logo-166x166_2536a87866b4ab4b1ab3975aac5b4f131729158464707.png" alt="" />
              <h1 className="text-white font-semibold text-[32px] leading-[40px]">Swing Token Airdrop</h1>
            </div>
            <div className="text-[#b1bbce] leading-[1.2] font-normal text-[14px] mb-[24px]">
              Swing Points can be acquired by using the Swing protocol through Galaxy Exchange. Points can be accumulated through a variety of activities including making Swaps and Bridge transfers, as well as performing Quests and Referring friends. The launch of Swing Points will be the primary method for transferring power to the community over time. It serves as a robust distribution channel, enabling everyone to actively contribute and participate in future Swing governance.
            </div>
            <div className="text-[14px] text-white leading-[18px] font-bold">
              Dapp stats
            </div>
            <div className="mt-[8px]">
              <div className="flex items-center justify-between gap-[16px]">
                <div className="w-3/12 p-[12px] bg-[#0e2240] rounded-[8px]">
                  <div className="flex items-center justify-between mb-[6px]">
                    <h5 className='text-[#b1bbce] text-[12px] leading-[20px] font-normal'>UAW</h5>
                    <img src={infoIco} alt="" />
                  </div>
                  <div className="text-[18px] leading-[24px] font-medium text-white">0</div>
                  <div className="text-[12px] leading-[1.5] font-medium text-white">0%</div>
                </div>
                <div className="w-3/12 p-[12px] bg-[#0e2240] rounded-[8px]">
                  <div className="flex items-center justify-between mb-[6px]">
                    <h5 className='text-[#b1bbce] text-[12px] leading-[20px] font-normal'>Transactions</h5>
                    <img src={infoIco} alt="" />
                  </div>
                  <div className="text-[18px] leading-[24px] font-medium text-white">0</div>
                  <div className="text-[12px] leading-[1.5] font-medium text-white">0%</div>
                </div>
                <div className="w-3/12 p-[12px] bg-[#0e2240] rounded-[8px]">
                  <div className="flex items-center justify-between mb-[6px]">
                    <h5 className='text-[#b1bbce] text-[12px] leading-[20px] font-normal'>Volume</h5>
                    <img src={infoIco} alt="" />
                  </div>
                  <div className="text-[18px] leading-[24px] font-medium text-white">$0</div>
                  <div className="text-[12px] leading-[1.5] font-medium text-white">0%</div>
                </div>
                <div className="w-3/12 p-[12px] bg-[#0e2240] rounded-[8px]">
                  <div className="flex items-center justify-between mb-[6px]">
                    <h5 className='text-[#b1bbce] text-[12px] leading-[20px] font-normal'>Balance</h5>
                    <img src={infoIco} alt="" />
                  </div>
                  <div className="text-[18px] leading-[24px] font-medium text-white">$0</div>
                  <div className="text-[12px] leading-[1.5] font-medium text-white">0%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[16px] mb-[20px] bg-[#041938] w-full rounded-[16px] p-[24px]">
            <div className="text-[18px] text-white leading-[17px] font-medium mb-[24px]">
              Actions
            </div>
            <div className="flex items-center justify-between height-[8px] gap-[8px]">
              <div className="bg-[#66a7ff] w-full h-[8px] bg-opacity-[0.1] rounded-s-lg" dir="ltr"></div>
              <div className="bg-[#66a7ff] w-full h-[8px] bg-opacity-[0.1]"></div>
              <div className="bg-[#66a7ff] w-full h-[8px] bg-opacity-[0.1] rounded-s-lg" dir="rtl"></div>
            </div>
            <div className="task_bar-controller">
              <div className="tasks">
                <div className="mt-[16px] w-full p-[24px] bg-[#0e2240] rounded-[16px] flex items-center justify-between">
                  <div className="info-tasks_text">
                    <div className="flex items-center justify-between mb-[6px]">
                      <h5 className='py-[4px] px-[12px] text-[#b1bbce] border border-[#44587c] rounded-[24px] text-[12px] font-normal'>Multi-step</h5>
                    </div>
                    <div className="mt-[8px] text-[14px] leading-[20px] font-medium text-white">Start by Exploring Galaxy Exchange</div>
                  </div>
                  <div className="locked-icon_side">
                    <img src={locked} alt="" />
                  </div>
                </div>
                <div className="mt-[16px] w-full p-[24px] bg-[#0e2240] rounded-[16px] flex items-center justify-between">
                  <div className="info-tasks_text">
                    <div className="flex items-center justify-between mb-[6px]">
                      <h5 className='py-[4px] px-[12px] text-[#b1bbce] border border-[#44587c] rounded-[24px] text-[12px] font-normal'>Multi-step</h5>
                    </div>
                    <div className="mt-[8px] text-[14px] leading-[20px] font-medium text-white">Bridge Your Assets to Earn XP</div>
                  </div>
                  <div className="locked-icon_side">
                    <img src={locked} alt="" />
                  </div>
                </div>
                <div className="mt-[16px] w-full p-[24px] bg-[#0e2240] rounded-[16px] flex items-center justify-between">
                  <div className="info-tasks_text">
                    <div className="flex items-center justify-between mb-[6px]">
                      <h5 className='py-[4px] px-[12px] text-[#b1bbce] border border-[#44587c] rounded-[24px] text-[12px] font-normal'>Multi-step</h5>
                    </div>
                    <div className="mt-[8px] text-[14px] leading-[20px] font-medium text-white">Make a Swap to Earn More XP</div>
                  </div>
                  <div className="locked-icon_side">
                    <img src={locked} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[16px] mb-[20px] bg-[#041938] w-full rounded-[16px] p-[24px]">
            <div className="text-[18px] text-white leading-[17px] font-medium mb-[24px]">
              Quiz
            </div>
            <div className="flex items-center justify-between height-[8px] gap-[8px]">
              <div className="bg-[#66a7ff] w-full h-[8px] bg-opacity-[0.1] rounded-s-lg" dir="ltr"></div>
              <div className="bg-[#66a7ff] w-full h-[8px] bg-opacity-[0.1]"></div>
              <div className="bg-[#66a7ff] w-full h-[8px] bg-opacity-[0.1] rounded-s-lg" dir="rtl"></div>
            </div>
            <div className="task_bar-controller">
              <div className="tasks">
                <div className="mt-[16px] w-full p-[24px] bg-[#0e2240] rounded-[16px] flex items-start justify-center flex-col">
                  <div className="flex justify-start items-center gap-[12px]">
                    <div className="flex items-center justify-center w-[24px] h-[24px] border border-[#44587c] rounded-full">
                      <h5 className='text-[#b1bbce]  text-[12px] font-bold'>1</h5>
                    </div>
                    <div className=" text-[14px] leading-[20px] font-medium text-white">What day is celebrated in the cryptocurrency world as Bitcoin Pizza day?</div>
                  </div>
                  <div className="mt-[24px] pl-[24px] w-full">
                    <div className="w-full [&>div]:hover:text-[#00ffa3] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">A</div>
                      <p className='text-white cursor-pointer'>July 4th</p>
                    </div>
                    <div className="w-full [&>div]:hover:text-[#00ffa3] mt-[16px] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">B</div>
                      <p className='text-white cursor-pointer'>May 22nd</p>
                    </div>
                    <div className="w-full [&>div]:hover:text-[#00ffa3] mt-[16px] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">C</div>
                      <p className='text-white cursor-pointer'>December 10th</p>
                    </div>
                  </div>
                </div>
                <div className="mt-[16px] w-full p-[24px] bg-[#0e2240] rounded-[16px] flex items-start justify-center flex-col">
                  <div className="flex justify-start items-center gap-[12px]">
                    <div className="flex items-center justify-center w-[24px] h-[24px] border border-[#44587c] rounded-full">
                      <h5 className='text-[#b1bbce]  text-[12px] font-bold'>2</h5>
                    </div>
                    <div className=" text-[14px] leading-[20px] font-medium text-white">Who created Bitcoin?</div>
                  </div>
                  <div className="mt-[24px] pl-[24px] w-full">
                    <div className="w-full [&>div]:hover:text-[#00ffa3] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">A</div>
                      <p className='text-white cursor-pointer'>Satoshi Nakamoto</p>
                    </div>
                    <div className="w-full [&>div]:hover:text-[#00ffa3] mt-[16px] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">B</div>
                      <p className='text-white cursor-pointer'>Satoshi Ajinomoto</p>
                    </div>
                    <div className="w-full [&>div]:hover:text-[#00ffa3] mt-[16px] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">C</div>
                      <p className='text-white cursor-pointer'>Satoshi Yakanami</p>
                    </div>
                  </div>
                </div>
                <div className="mt-[16px] w-full p-[24px] bg-[#0e2240] rounded-[16px] flex items-start justify-center flex-col">
                  <div className="flex justify-start items-center gap-[12px]">
                    <div className="flex items-center justify-center w-[24px] h-[24px] border border-[#44587c] rounded-full">
                      <h5 className='text-[#b1bbce]  text-[12px] font-bold'>3</h5>
                    </div>
                    <div className=" text-[14px] leading-[20px] font-medium text-white">What is a miner?</div>
                  </div>
                  <div className="mt-[24px] pl-[24px] w-full">
                    <div className="w-full [&>div]:hover:text-[#00ffa3] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">A</div>
                      <p className='text-white cursor-pointer'>A type of blockchain</p>
                    </div>
                    <div className="w-full [&>div]:hover:text-[#00ffa3] mt-[16px] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">B</div>
                      <p className='text-white cursor-pointer'>An algorithm that predicts the next part of the chain</p>
                    </div>
                    <div className="w-full [&>div]:hover:text-[#00ffa3] mt-[16px] flex items-center justify-start" >
                      <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#b1bbce] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">C</div>
                      <p className='text-white cursor-pointer'>A person doing calculations to verify a transaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-aircontroller mt-[50px] pl-[16px]">
          <div className="flex items-center justify-between w-[336px] flex-col">
            <div className="w-full flex justify-between items-center gap-[16px]">
              <div className="bg-[#041938] px-[11px] pt-[10px] pb-[8px] w-2/4	flex justify-center items-center flex-col rounded-[8px]">
                <img src={shareico} alt="" />
                <div className="mt-[8px] text-[14px] leading-[20px] font-normal text-[#b1bbce]">Share</div>
              </div>
              <div className="bg-[#041938] px-[11px] pt-[10px] pb-[8px] w-2/4	flex justify-center items-center flex-col rounded-[8px]">
                <img src={flagmap} alt="" />
                <div className="mt-[8px] text-[14px] leading-[20px] font-normal text-[#b1bbce]">Report</div>
              </div>
            </div>
            <div className="bg-[#041938] w-full mt-[16px] rounded-[16px] p-[24px]">
              <div className="mb-[16px] info_with-number flex justify-between items-center">
                <div className="text-[14px] leading-[20px] font-normal text-[#b1bbce]">Estimated date</div>
                <div className="text-[14px] leading-[18px] font-bold text-[#fff]">Q4 2024</div>
              </div>
              <div className="mb-[16px] info_with-number flex justify-between items-center">
                <div className="text-[14px] leading-[20px] font-normal text-[#b1bbce]">Difficulty</div>
                <div className="flex items-center justify-end gap-[8px]">
                  <div className="bg-[#203457] h-[6px] rounded-[6px] w-[100px]">
                    <div className='bg-[#006cff] h-[6px] rounded-[6px] w-2/4'></div>
                  </div>
                  <div className="text-[14px] leading-[18px] font-bold text-[#fff]">Medium</div>
                </div>
              </div>
              <div className="info_with-number flex justify-between items-center">
                <div className="text-[14px] leading-[20px] font-normal text-[#b1bbce]">Likelihood</div>
                <div className="text-[14px] leading-[18px] font-bold text-[#fff]">Confirmed</div>
              </div>
            </div>
            <div className="bg-[#041938] w-full mt-[16px] rounded-[16px] p-[24px]">
              <div className="flex justify-between items-center">
                <div className="text-[18px] leading-[17px] font-medium text-white">Total XP for actions</div>
              </div>
              <hr className='border-[#163159] my-[16px]' />
              <div className="info_with-number flex justify-start items-center">
                <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] mr-[8px] w-[32px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">XP</div>
                <div className="text-[14px] leading-normal font-bold text-[#fff]">30</div>
              </div>
            </div>
            <div className="bg-[#041938] w-full mt-[16px] rounded-[16px] p-[24px]">
              <div className="flex justify-between items-center">
                <div className="text-[18px] leading-[17px] font-medium text-white">Project page</div>
                <img src={arrowR} alt="" />
              </div>
              <hr className='border-[#163159] my-[16px]' />
              <div className="info_with-number flex justify-start items-center gap-[12px]">
                <img src="https://dashboard-assets.dappradar.com/document/15924/swing-dapp-defi-matic-logo_3bbe1abc63492177279587e9826f274c.png" className='w-[32px] h-[32px] rounded-full' alt="" />
                <div className="text-[14px] leading-normal font-bold text-[#fff]">Swing</div>
              </div>
            </div>
            <div className="bg-[#041938] w-full mt-[16px] rounded-[16px] p-[24px]">
              <div className="flex justify-between items-center">
                <div className="text-[18px] leading-[17px] font-medium text-white">Participants</div>
              </div>
              <hr className='border-[#163159] my-[16px]' />
              <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                <div className="text-[16px] leading-normal font-normal text-[#fff]">Entries</div>
                <div className="flex items-center justify-end">
                  <div className="flex items-center mr-[8px] gap-[-10px]">
                    <div className="w-[24px] h-[24px] mr-[-5px]">
                      <img className="w-full rounded-full" src="https://api-avatars.dappradar.com/0xf8b7bf8ea60c3f6311b59887f5589c7569013f31.svg" alt="" />
                    </div>
                    <div className="w-[24px] h-[24px] mr-[-5px]">
                      <img className="w-full rounded-full" src="https://api-avatars.dappradar.com/0x75f8099445903a6803c0588c1a964d042ad5e86f.svg" alt="" />
                    </div>
                    <div className="w-[24px] h-[24px] mr-[-5px]">
                      <img className="w-full rounded-full" src="https://api-avatars.dappradar.com/0xff4c27433a1d5434ceb4124ffba78d971dbe74f5.svg" alt="" />
                    </div>
                    <div className="w-[24px] h-[24px] mr-[-5px]">
                      <img className="w-full rounded-full" src="https://api-avatars.dappradar.com/0x232d7e277f19ac2d207a189905f856b9f8692f09.svg" alt="" />
                    </div>
                    <div className="w-[24px] h-[24px]">
                      <img className="w-full rounded-full" src="https://api-avatars.dappradar.com/0xeb8bead943d3f295e85dd6830950f48e799f15c1.svg" alt="" />
                    </div>
                  </div>
                  <p className='text-[#66a7ff] text-[14px] font-medium'>344</p>
                </div>
              </div>
            </div>
            <div className="bg-[#041938] w-full mt-[16px] rounded-[16px] p-[24px]">
              <div className="flex justify-between items-center">
                <div className="text-[18px] leading-[17px] font-medium text-white">TOP - 50</div>
              </div>
              <hr className='border-[#163159] my-[16px]' />
              <div className="flex justify-start items-start flex-col gap-[8px] h-[352px] pr-[10px] mr-[-15px] overflow-hidden overflow-y-auto	[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#fff] dark:[&::-webkit-scrollbar-track]:bg-[#0e2240] dark:[&::-webkit-scrollbar-thumb]:bg-[#fff]">
                <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                  <div className="flex justify-between items-center gap-[8px]">
                    {/* <h5 className='text-[16px] text-white underline'>1</h5> */}
                    <div className='relative w-[30px]  flex justify-center items-center'>
                      <img className='w-full  blur-lg absolute ' src={top1} alt="" />
                      <img className='w-full z-[1]' src={top1} alt="" />
                    </div>
                    <img className='w-[32px] h-[32px] object-cover object-center rounded-full' src={hidan} alt="" />
                    <div className="text-[16px] leading-normal font-normal text-[#fff]">HIDAN</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] px-[16px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">30044XP</div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                  <div className="flex justify-between items-center gap-[8px]">
                    {/* <h5 className='text-[16px] text-white underline'>2</h5> */}
                    <div className='relative w-[28px] flex justify-center items-center'>
                      <img className='w-full blur-lg absolute ' src={top2} alt="" />
                      <img className='w-full z-[1]  ' src={top2} alt="" />
                    </div>
                    <img className='w-[32px] h-[32px] object-cover object-center rounded-full' src={venom} alt="" />
                    <div className="text-[16px] leading-normal font-normal text-[#fff]">Venom</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] px-[16px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">29044XP</div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                  <div className="flex justify-between items-center gap-[8px]">
                    {/* <h5 className='text-[16px] text-white underline'>3</h5> */}
                    <div className='relative w-[60px] flex justify-center items-center'>
                      <img className='w-full blur-lg absolute ' src={top3} alt="" />
                      <img className='w-full z-[1]' src={top3} alt="" />
                    </div>
                    <img className='w-[32px] h-[32px] object-cover object-center rounded-full' src={Deadpool} alt="" />
                    <div className="text-[16px] leading-normal font-normal text-[#fff]">Deadpool</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] px-[16px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">29032XP</div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                  <div className="flex justify-between items-center gap-[8px]">
                    <h5 className='text-[16px] text-white underline'>4</h5>
                    <div className='bg-center bg-cover bg-[url("./assets/images/Loki.jpeg")] w-[32px] h-[32px] rounded-full' alt="" />
                    <div className="text-[16px] leading-normal font-normal text-[#fff]">Loki</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] px-[16px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">30044XP</div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                  <div className="flex justify-between items-center gap-[8px]">
                    <h5 className='text-[16px] text-white underline'>5</h5>
                    <div className='bg-center bg-cover bg-[url("./assets/images/Wanda.jpg")] w-[32px] h-[32px] rounded-full' alt="" />
                    <div className="text-[16px] leading-normal font-normal text-[#fff]">Wanda</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] px-[16px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">30044XP</div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-[12px] bg-[#0e2240] p-[16px] rounded-[8px]">
                  <div className="flex justify-between items-center gap-[8px]">
                    <h5 className='text-[16px] text-white underline'>6</h5>
                    <div className='bg-left bg-cover bg-[url("./assets/images/Lucifer.jpg")] w-[32px] h-[32px] rounded-full' alt="" />
                    <div className="text-[16px] leading-normal font-normal text-[#fff]">Lucifer</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="rounded-full flex items-center justify-center text-[15px] font-bold text-[#00ffa3] px-[16px] h-[32px] bg-gradient-to-r from-[#00ffa31a] to-[#eefd461a]">30044XP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <AirdropModal />
    </div>
  )
}

export default AirdropCustom