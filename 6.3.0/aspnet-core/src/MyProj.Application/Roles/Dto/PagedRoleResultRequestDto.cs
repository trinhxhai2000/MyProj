﻿using Abp.Application.Services.Dto;

namespace MyProj.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

