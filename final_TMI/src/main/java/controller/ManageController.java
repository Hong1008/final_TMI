package controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.ManageDTO;
import service.ManageService;

@Controller
public class ManageController {
	@Autowired
	private ManageService service;
	
	public ManageController() {
		// TODO Auto-generated constructor stub
	}
	
	public void setService(ManageService service) {
		this.service = service;
	}
	
	@RequestMapping("/pj_setting_main.do")
	public ModelAndView main(ModelAndView mav) {
		String pro_id="testpj";
		
		mav.addObject("content", service.manageContentProcess(pro_id));
		mav.addObject("people", service.managePeopleProcess(pro_id));
		mav.setViewName("manage/mg_main");
		return mav;
	}
	
	@RequestMapping("/pj_setting_set.do")
	public ModelAndView pjsetting(ModelAndView mav, String pro_id) {
		mav.addObject("dto", service.manageContentProcess(pro_id));
		mav.setViewName("manage/mg_setting");
		return mav;
	}
	
	@RequestMapping("/pj_content_upt.do")
	public String pjupdate(String pro_id, String pro_name, String pro_info, Date pro_start, Date pro_end, Date pro_rend) {
		ManageDTO dto = new ManageDTO();
		dto.setPro_id(pro_id);
		dto.setPro_name(pro_name);
		dto.setPro_info(pro_info); 
		dto.setPro_start(pro_start);
		dto.setPro_end(pro_end);
		dto.setPro_rend(pro_rend);
		
		/*System.out.println(dto.getPro_id());
		System.out.println(dto.getPro_name());
		System.out.println(dto.getPro_info());
		System.out.println(dto.getPro_start());
		System.out.println(dto.getPro_end());
		System.out.println(dto.getPro_rend());*/
		service.manageContentUpdateProcess(dto);		
		
		
		return "redirect:/pj_setting_main.do";
	}
	
	@RequestMapping("/pj_setting_people.do")
	public ModelAndView pjpeople(ModelAndView mav, String pro_id) {
		mav.addObject("people", service.managePeopleProcess(pro_id));
		
		mav.setViewName("manage/mg_people");
		return mav;
	}
	
	
}